package com.crm.repository;

import com.crm.model.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends CrudRepository<Client, Integer>
{
    List<Client> findAll();
    Optional<Client> findById(Integer id);
}
