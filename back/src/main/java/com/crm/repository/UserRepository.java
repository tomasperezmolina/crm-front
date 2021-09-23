package com.crm.repository;

import com.crm.model.User;
import com.crm.model.UserType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Integer>
{
    List<User> findAllByActiveIsTrue();
    Optional<User> findFirstByIdAndActiveIsTrue(Integer id);
    Optional<User> findFirstByEmailAndActiveIsTrue(String email);
    List<User> findAllByTypeAndActiveIsTrue(UserType type);
    Optional<User> findByEmail(String email);

    @Query(value = "select u from User u where ( " +
            "lower(u.name) like lower(concat(:name, '%')) or lower(u.lastName) like lower(concat(:name, '%')))" +
            "and u.type in :type and u.active = true")
    Page<User> findPagedAndFilteredAndSorted(Pageable pageable,@Param("type") UserType[] type,@Param("name") String name);
}
