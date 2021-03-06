import React, { useEffect, useState } from "react";
import { alpha } from "@mui/material/styles";
import {
  Button,
  Grid,
  MenuItem,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import * as yup from "yup";
import { useFormik } from "formik";
import { FormikSelectField, FormikTextField } from "./formik-fields";
import { nanoid } from "nanoid";
import { formikInitialValues } from "./formik-props";
import {
  LicenseRow,
  LicenseType,
  licenseTypes,
  ProgramType,
  programTypes,
} from "../model/opportunity";
import { licensePrice } from "../model/pricing";

const validationSchema = yup.object({
  program: yup
    .string()
    .oneOf(programTypes.slice())
    .required("Se requiere un programa"),
  license: yup
    .string()
    .oneOf(licenseTypes.slice())
    .required("Se requiere un tipo de licencia"),
  amount: yup
    .number()
    .positive("El número de licencias debe ser positivo")
    .required("Se require una cantidad de licencias"),
});

type LicenseTableRow = LicenseRow & {
  id: string;
  totalPrice: number;
};

function createLicenseRow(
  program: ProgramType,
  license: LicenseType,
  amount: number
): LicenseTableRow {
  const pricePerUnit = licensePrice(program, license);
  return {
    id: nanoid(),
    program,
    license,
    amount,
    pricePerUnit,
    totalPrice: amount * pricePerUnit,
  };
}

function parseLicenseRow(values: {
  program: string;
  license: string;
  amount: string;
}) {
  return createLicenseRow(
    values.program as ProgramType,
    values.license as LicenseType,
    parseInt(values.amount)
  );
}

interface LicenseBuilderProps {
  title: string;
  value: LicenseTableRow[];
  onChange: (rows: LicenseTableRow[]) => void;
}

export default function LicenseBuilder({
  title,
  value,
  onChange,
}: LicenseBuilderProps) {
  const [rows, setRows] = useState<LicenseTableRow[]>(value);

  const formik = useFormik({
    initialValues: formikInitialValues(
      validationSchema.fields,
      validationSchema
    ),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addRow(parseLicenseRow(values));
    },
  });

  const addRow = (row: LicenseTableRow) => {
    const presentRow = rows.find(
      (r) => r.program === row.program && r.license === row.license
    );
    let newRows = [];
    if (!presentRow) {
      newRows = [...rows, row];
    } else {
      const replacement = {
        ...presentRow,
        amount: presentRow.amount + row.amount,
      };
      newRows = rows
        .filter((r) => r.id !== presentRow.id)
        .concat([replacement]);
    }
    setRows(newRows);
    onChange(newRows);
    formik.resetForm();
  };

  const handleDeleteRows = (rowIds: readonly string[]) => {
    setRows(rows.filter((r) => !rowIds.find((id) => id === r.id)));
  };

  return (
    <Grid container direction="row" columns={3} columnSpacing={2}>
      <Grid
        xs={1}
        item
        container
        direction="column"
        justifyContent="center"
        sx={{ height: "inherit" }}
      >
        <Grid item>
          <form onSubmit={formik.handleSubmit}>
            <Grid container direction="column" rowSpacing={2}>
              <Grid item>
                <FormikSelectField
                  name="program"
                  label="Programa"
                  formik={formik}
                  validationSchema={validationSchema}
                >
                  {programTypes.map((t, idx) => (
                    <MenuItem key={idx} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </FormikSelectField>
              </Grid>
              <Grid item>
                <FormikSelectField
                  name="license"
                  label="Tipo de licencia"
                  formik={formik}
                  validationSchema={validationSchema}
                >
                  {licenseTypes.map((t, idx) => (
                    <MenuItem key={idx} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </FormikSelectField>
              </Grid>
              <Grid item>
                <FormikTextField
                  name="amount"
                  label="Cantidad"
                  formik={formik}
                  validationSchema={validationSchema}
                />
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Grid xs={2} item container direction="column">
        <LicenseTable
          title={title}
          rows={rows}
          onDeleteRows={handleDeleteRows}
        />
      </Grid>
    </Grid>
  );
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: SorteableKey;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "program",
    numeric: false,
    disablePadding: true,
    label: "Programa",
  },
  {
    id: "license",
    numeric: false,
    disablePadding: false,
    label: "Tipo de licencia",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "Cantidad",
  },
  {
    id: "pricePerUnit",
    numeric: true,
    disablePadding: false,
    label: "Precio/unidad",
  },
  {
    id: "totalPrice",
    numeric: true,
    disablePadding: false,
    label: "Precio total",
  },
];

interface EnhancedTableHeadProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: SorteableKey
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  disableSelect?: boolean;
}

function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  disableSelect,
}: EnhancedTableHeadProps) {
  const createSortHandler =
    (property: SorteableKey) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {!disableSelect && (
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          )}
        </TableCell>

        {headCells.map((headCell, idx) => (
          <TableCell
            key={headCell.id}
            align={idx !== 0 ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  title: string;
  numSelected: number;
  onDelete?: () => void;
  totalPrice: number;
}

const EnhancedTableToolbar = ({
  title,
  numSelected,
  onDelete,
  totalPrice,
}: EnhancedTableToolbarProps) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { sm: 2 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <>
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} seleccionadas
          </Typography>
          <Tooltip title="Delete">
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
            align="right"
          >
            Total: $ {totalPrice}
          </Typography>
        </>
      )}
    </Toolbar>
  );
};

type SorteableKey = keyof Omit<LicenseTableRow, "id">;

interface EnhancedTableProps {
  title: string;
  rows: LicenseTableRow[];
  onDeleteRows?: (rowIds: readonly string[]) => void;
}

export function LicenseTable({
  title,
  rows,
  onDeleteRows,
}: EnhancedTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<SorteableKey>("program");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: SorteableKey
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteSelected = () => {
    if (onDeleteRows) {
      onDeleteRows(selected);
      setSelected([]);
    }
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        <EnhancedTableToolbar
          title={title}
          numSelected={selected.length}
          onDelete={handleDeleteSelected}
          totalPrice={rows.reduce((prev, curr) => prev + curr.totalPrice, 0)}
        />
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              disableSelect
            />
            <TableBody>
              {rows
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={
                        onDeleteRows &&
                        ((event: React.MouseEvent<unknown>) =>
                          handleClick(event, row.id))
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        {onDeleteRows && (
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        )}
                      </TableCell>

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.program}
                      </TableCell>
                      <TableCell align="right">{row.license}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">$ {row.pricePerUnit}</TableCell>
                      <TableCell align="right">$ {row.totalPrice}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
