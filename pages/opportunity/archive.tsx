import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppSelector } from "../../state/dispatch";
import { selectOpportunities } from "../../state/opportunities";
import React, { useState } from "react";
import {
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
  Grid,
  Container,
} from "@mui/material";
import { red, green } from "@mui/material/colors";
import { stepTypeToSpanish } from "../../spanish/opportunity";
import {
  CanceledOpportunity,
  inferCanceledOpportunityStep,
} from "../../model/opportunity";

interface OpportunitiesArchiveProps {}

type TableStyle = "positive" | "negative";

interface EnhancedTableToolbarProps {
  title: string;
  style: TableStyle;
}

const EnhancedTableToolbar = ({ title, style }: EnhancedTableToolbarProps) => {
  return (
    <Toolbar
      sx={{
        bgcolor: style === "positive" ? green[300] : red[300],
        pl: { sm: 2 },
        pr: { sm: 2 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>
    </Toolbar>
  );
};

interface EnhancedTableHeadProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: SorteableKey
  ) => void;
  order: Order;
  orderBy: string;
}

interface HeadCell {
  disablePadding: boolean;
  id: SorteableKey;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Nombre",
  },
  {
    id: "state",
    numeric: false,
    disablePadding: false,
    label: "Etapa",
  },
];

function EnhancedTableHead({
  order,
  orderBy,
  onRequestSort,
}: EnhancedTableHeadProps) {
  const createSortHandler =
    (property: SorteableKey) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
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

interface OpportunitiesArchiveTableRow {
  id: number;
  name: string;
  state: string;
}

type SorteableKey = keyof Omit<OpportunitiesArchiveTableRow, "id">;

interface OpportunitiesArchiveTableProps {
  title: string;
  rows: OpportunitiesArchiveTableRow[];
  onClick: (id: number) => void;
  style: TableStyle;
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

export function OpportunitiesArchiveTable({
  title,
  rows,
  onClick,
  style,
}: OpportunitiesArchiveTableProps) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<SorteableKey>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: SorteableKey
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    onClick(id);
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

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        <EnhancedTableToolbar title={title} style={style} />
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event: React.MouseEvent<unknown>) =>
                        handleClick(event, row.id)
                      }
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.state}</TableCell>
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
          rowsPerPageOptions={[20]}
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

const OpportunitiesArchive: NextPage<OpportunitiesArchiveProps> = () => {
  const opportunities = useAppSelector(selectOpportunities);
  const router = useRouter();

  return (
    <>
      {opportunities.state === "success" && (
        <Container maxWidth="xl" sx={{ height: "inherit", paddingY: 2 }}>
          <Grid container direction="row" columns={2} columnSpacing={2}>
            <Grid item xs={1}>
              <OpportunitiesArchiveTable
                title="Oportunidades Completadas"
                style="positive"
                rows={opportunities.value
                  .filter((o) => o.step === "Completed")
                  .map((o) => ({
                    id: o.id,
                    name: o.name,
                    state: stepTypeToSpanish(o.step)!,
                  }))}
                onClick={(id) => router.push(`/opportunity/${id}`)}
              />
            </Grid>
            <Grid item xs={1}>
              <OpportunitiesArchiveTable
                title="Oportunidades Canceladas"
                style="negative"
                rows={opportunities.value
                  .filter((o) => o.step === "Canceled")
                  .map((o) => ({
                    id: o.id,
                    name: o.name,
                    state: `${stepTypeToSpanish(
                      inferCanceledOpportunityStep(o as CanceledOpportunity)
                    )!} (${stepTypeToSpanish("Canceled")})`,
                  }))}
                onClick={(id) => router.push(`/opportunity/${id}`)}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default OpportunitiesArchive;
