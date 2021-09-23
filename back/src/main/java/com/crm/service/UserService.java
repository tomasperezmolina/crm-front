package com.crm.service;

import com.crm.model.form.PasswordForm;
import com.crm.model.User;
import com.crm.model.form.UserEditForm;
import com.crm.model.UserType;
import com.crm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll(){
        return userRepository.findAllByActiveIsTrue();
    }

    public Page<User> findAllPagedAndFiltered(int page, int size, UserType[] type, String name){
        return userRepository.findPagedAndFilteredAndSorted(PageRequest.of(page, size, Sort.by("lastName")), type, name);
    }

    public List<User> findAllByType(UserType type){
        return userRepository.findAllByTypeAndActiveIsTrue(type);
    }

    public Optional<User> findCurrent() {
        String email = ((org.springframework.security.core.userdetails.User)
                SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        return userRepository.findFirstByEmailAndActiveIsTrue(email);
    }

    public Optional<User> findById(int id) {
        return userRepository.findFirstByIdAndActiveIsTrue(id);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public int save(User user){
        user.setEmail(user.getEmail().toLowerCase());
        user.setActive(true);
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        userRepository.save(user);
        return user.getId();
    }

    public boolean delete(int id){
        final Optional<User> byId = findById(id);
        if (byId.isPresent()) {
            User user = byId.get();
            user.setActive(false);
            userRepository.save(user);
            return true;
        } else {
            return false;
        }
    }

    public User update(int id, UserEditForm userEditForm){
        final Optional<User> byId = findById(id);
        if(byId.isPresent()) {
            User user = byId.get();
            userEditForm.setEmail(userEditForm.getEmail().toLowerCase());
            userEditForm.patch(user);
            userRepository.save(user);
            return user;
        }
        throw new NoSuchElementException("User does not exist.");
    }

     public void changePasswordById(int id, PasswordForm passwordForm) {
        User user = findById(id).orElseThrow(() -> new NoSuchElementException("User does not exist."));
        user.setPassword(BCrypt.hashpw(passwordForm.getPassword(), BCrypt.gensalt()));
        userRepository.save(user);
    }

    public User updateCurrent(UserEditForm userEditForm){
        User user = findCurrent().orElseThrow(() -> new NoSuchElementException("User does not exist."));
        userEditForm.patch(user);
        userRepository.save(user);
        return user;
    }

    public boolean verifyPassword(PasswordForm passwordForm) {
        return findCurrent()
                .filter(user -> BCrypt.checkpw(passwordForm.getPassword(), user.getPassword()))
                .isPresent();
    }

    public void changeCurrentPassword(PasswordForm passwordForm) {
        User user = findCurrent().orElseThrow(() -> new NoSuchElementException("User does not exist."));
        user.setPassword(BCrypt.hashpw(passwordForm.getPassword(), BCrypt.gensalt()));
        userRepository.save(user);
    }

    public void hashAndSave(User user){
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        userRepository.save(user);
    }

    public void justSave(User user){
        userRepository.save(user);
    }
}
