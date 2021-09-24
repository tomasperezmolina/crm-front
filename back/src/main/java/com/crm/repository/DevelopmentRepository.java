package com.crm.repository;

import com.crm.model.Development;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DevelopmentRepository extends CrudRepository<Development, Integer>
{
}
