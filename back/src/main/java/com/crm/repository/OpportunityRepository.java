package com.crm.repository;

import com.crm.model.Opportunity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OpportunityRepository extends CrudRepository<Opportunity, Integer>
{
    List<Opportunity> findAll();
    Optional<Opportunity> findById(Integer id);
}
