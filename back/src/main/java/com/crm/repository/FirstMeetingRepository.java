package com.crm.repository;

import com.crm.model.FirstMeeting;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FirstMeetingRepository extends CrudRepository<FirstMeeting, Integer>
{
}
