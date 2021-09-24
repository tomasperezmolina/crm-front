package com.crm.controller;

import com.crm.model.ClientContact;
import com.crm.model.Opportunity;
import com.crm.model.form.ClientForm;
import com.crm.model.form.StageForm;
import com.crm.service.OpportunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/opportunity")
public class OpportunityController {

    private final OpportunityService opportunityService;

    @Autowired
    public OpportunityController(OpportunityService opportunityService) {
        this.opportunityService = opportunityService;
    }

    @GetMapping()
    public List<Opportunity> getAllOpportunities() {
        return opportunityService.findAll();
    }

    @PostMapping()
    public ResponseEntity createOpportunity(@Valid @RequestBody ClientForm clientForm, UriComponentsBuilder b) {
        int id = opportunityService.saveOpportunity(clientForm);
        UriComponents components = b.path("/opportunity/{id}").buildAndExpand(id);
        return ResponseEntity.created(components.toUri()).build();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Opportunity> getOpportunityById(@PathVariable("id") int id) {
        final Optional<Opportunity> optional = opportunityService.findById(id);
        return optional.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/{id}")
    public ResponseEntity advanceStage(@PathVariable("id") int id, @Valid @RequestBody StageForm stageForm) {
        opportunityService.advanceStage(id, stageForm);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/client")
    public ResponseEntity modifyClient(@PathVariable("id") int id, @Valid @RequestBody ClientForm clientForm) {
        opportunityService.updateClient(id, clientForm);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/client-contact")
    public ResponseEntity addClientContact(@PathVariable("id") int id, @Valid @RequestBody ClientContact clientContact) {
        opportunityService.addClientContact(id, clientContact);
        return ResponseEntity.noContent().build();
    }
}
