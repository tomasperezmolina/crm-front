package com.crm.repository;

import com.crm.model.POCInstallation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface POCInstallationRepository extends CrudRepository<POCInstallation, Integer>
{
}
