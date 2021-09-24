package com.crm.repository;

import com.crm.model.ClientContact;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientContactRepository extends CrudRepository<ClientContact, Integer>
{
}
