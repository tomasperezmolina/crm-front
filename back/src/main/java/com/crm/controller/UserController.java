package com.crm.controller;

import com.crm.model.User;
import com.crm.model.form.UserEditForm;
import com.crm.model.UserType;
import com.crm.model.form.PasswordForm;
import com.crm.security.jwt.JWTConfigurer;
import com.crm.security.jwt.JWTToken;
import com.crm.security.jwt.TokenProvider;
import com.crm.service.UserService;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final TokenProvider tokenProvider;

    @Autowired
    public UserController(UserService userService, TokenProvider tokenProvider) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
    }

    @GetMapping()
    @Secured("ROLE_ADMIN")
    public List<User> getAllUsers() {return userService.findAll();}

    @Secured("ROLE_ADMIN")
    @GetMapping(value = "/paged")
    public ResponseEntity<Page<User>> getAllUsersPagedAndFiltered(
            @ApiParam(value = "Query param for 'page number'") @Valid @RequestParam(value = "page") int page,
            @ApiParam(value = "Query param for 'page size'") @Valid @RequestParam(value = "size", required = false, defaultValue = "10") Integer size,
            @ApiParam(value = "Query param for 'type' filter") @Valid @RequestParam(value = "type", required = false) UserType[] type,
            @ApiParam(value = "Query param for 'name' filter") @Valid @RequestParam(value = "name", required = false, defaultValue = "") String name
            ) {
        if (size == 0) size = 10;
        if (type == null) type = UserType.values();
        Page<User> userPage = userService.findAllPagedAndFiltered(page, size, type, name);
        return ResponseEntity.ok(userPage);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") int id) {
        final Optional<User> optional = userService.findById(id);
        return optional.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping(value = "/admin")
    @Secured("ROLE_ADMIN")
    public List<User> getAllAdmins() {
        return userService.findAllByType(UserType.ADMIN);
    }

    @PostMapping("/sign-up")
    public ResponseEntity signUp(@Valid @RequestBody User user, UriComponentsBuilder b) {
        if(user.getPassword().length() < 8) return ResponseEntity.badRequest().build();
        user.setType(UserType.USER);
        int id = userService.save(user);
        UriComponents components = b.path("/user/{id}").buildAndExpand(id);
        return ResponseEntity.created(components.toUri()).build();
    }

    @PostMapping()
    @Secured("ROLE_ADMIN")
    public ResponseEntity createUser(@Valid @RequestBody User user, UriComponentsBuilder b) {
        int id = userService.save(user);
        UriComponents components = b.path("/user/{id}").buildAndExpand(id);
        return ResponseEntity.created(components.toUri()).build();
    }

    @PutMapping(value = "/{id}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity modifyUserById(@PathVariable("id") int id, @Valid @RequestBody UserEditForm userEditForm) {
        userService.update(id, userEditForm);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}/change_password")
    @Secured("ROLE_ADMIN")
    public ResponseEntity changePasswordById(@PathVariable("id") int id, @Valid @RequestBody PasswordForm passwordForm) {
        userService.changePasswordById(id, passwordForm);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteUser(@PathVariable int id) {
        return userService.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/me")
    public ResponseEntity<User> getCurrentUser() {
        final Optional<User> optional = userService.findCurrent();
        return optional.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping(value = "/me")
    public ResponseEntity modifyCurrentUser(@Valid @RequestBody UserEditForm userEditForm) {
        User user = userService.updateCurrent(userEditForm);

        ArrayList<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getType().toString()));
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword(), authorities);
        String jwt = tokenProvider.createToken(authentication);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JWTConfigurer.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new JWTToken(jwt), httpHeaders, HttpStatus.OK);
    }

    @PostMapping(value = "/me/verify_password")
    public ResponseEntity verifyPassword(@Valid @RequestBody PasswordForm passwordForm) {
        boolean result = this.userService.verifyPassword(passwordForm);
        return result ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PutMapping(value = "/me/change_password")
    public ResponseEntity changePassword(@Valid @RequestBody PasswordForm passwordForm) {
        userService.changeCurrentPassword(passwordForm);
        return ResponseEntity.noContent().build();
    }
}
