package com.crm.repository;

import com.crm.model.POCDevelopment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface POCDevelopmentRepository extends CrudRepository<POCDevelopment, Integer>
{
}
