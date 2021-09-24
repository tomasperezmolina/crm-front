package com.crm.service;

import com.crm.model.*;
import com.crm.model.form.*;
import com.crm.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class OpportunityService {

    private ClientRepository clientRepository;
    private ClientContactRepository clientContactRepository;
    private DevelopmentRepository developmentRepository;
    private FirstMeetingRepository firstMeetingRepository;
    private OrderRepository orderRepository;
    private POCDevelopmentRepository pocDevelopmentRepository;
    private POCInstallationRepository pocInstallationRepository;
    private OpportunityRepository opportunityRepository;
    private UserService userService;

    @Autowired
    public OpportunityService(ClientRepository clientRepository, ClientContactRepository clientContactRepository, DevelopmentRepository developmentRepository, FirstMeetingRepository firstMeetingRepository, OrderRepository orderRepository, POCDevelopmentRepository pocDevelopmentRepository, POCInstallationRepository pocInstallationRepository, OpportunityRepository opportunityRepository, UserService userService) {
        this.clientRepository = clientRepository;
        this.clientContactRepository = clientContactRepository;
        this.developmentRepository = developmentRepository;
        this.firstMeetingRepository = firstMeetingRepository;
        this.orderRepository = orderRepository;
        this.pocDevelopmentRepository = pocDevelopmentRepository;
        this.pocInstallationRepository = pocInstallationRepository;
        this.opportunityRepository = opportunityRepository;
        this.userService = userService;
    }

    public List<Opportunity> findAll() {
        return opportunityRepository.findAll();
    }

    public int createOpportunity(ClientForm clientForm) {
        User owner = userService.findCurrent().orElseThrow(() -> new NoSuchElementException("User does not exist."));

        Client client = new Client();
        clientForm.patch(client);
        client.setOwner(owner);
        clientRepository.save(client);

        Opportunity opportunity = new Opportunity(owner, client, Stage.PROSPECT);

        firstMeetingRepository.save(opportunity.getFirstMeeting());
        developmentRepository.save(opportunity.getDevelopment());
        pocDevelopmentRepository.save(opportunity.getPocDevelopment());
        pocInstallationRepository.save(opportunity.getPocInstallation());
        orderRepository.save(opportunity.getOrder());

        opportunityRepository.save(opportunity);
        return opportunity.getId();
    }

    public Optional<Opportunity> findById(int opportunityId) {
        return opportunityRepository.findById(opportunityId);
    }

    public Opportunity findByIdOrError(int opportunityId) {
        return findById(opportunityId).orElseThrow(() -> new NoSuchElementException("Opportunity does not exist."));
    }

    public void advanceStage(int opportunityId, StageForm stageForm) {
        Opportunity opportunity = findByIdOrError(opportunityId);
        Stage current = opportunity.getStage();
        if (current == Stage.ORDER || current == Stage.CANCELLED) return;
        User newOwner = userService.findById(stageForm.getNewOwner()).orElseThrow(() -> new NoSuchElementException("New Owner does not exist."));
        Stage next = Stage.next(opportunity.getStage());
        switch (next) {
            case FIRSTMEETING:
                FirstMeeting firstMeeting = opportunity.getFirstMeeting();
                firstMeeting.setOwner(newOwner);
                firstMeetingRepository.save(firstMeeting);
                break;
            case DEVELOPMENT:
                Development development = opportunity.getDevelopment();
                development.setOwner(newOwner);
                developmentRepository.save(development);
                break;
            case POCDEVELOPMENT:
                POCDevelopment pocDevelopment = opportunity.getPocDevelopment();
                pocDevelopment.setOwner(newOwner);
                pocDevelopmentRepository.save(pocDevelopment);
                break;
            case POCINSTALLATION:
                POCInstallation pocInstallation = opportunity.getPocInstallation();
                pocInstallation.setOwner(newOwner);
                pocInstallationRepository.save(pocInstallation);
                break;
            case NEGOTIATION:
                Order order = opportunity.getOrder();
                order.setOwner(newOwner);
                orderRepository.save(order);
                break;
        }
        opportunity.setStage(next);
        opportunity.setCurrentOwner(newOwner);
        opportunityRepository.save(opportunity);
    }

    public void cancelOpportunity(int opportunityId) {
        Opportunity opportunity = findByIdOrError(opportunityId);
        opportunity.setStage(Stage.CANCELLED);
        opportunityRepository.save(opportunity);
    }

    public void updateClient(int opportunityId, ClientForm clientForm) {
        Opportunity opportunity = findByIdOrError(opportunityId);
        Client client = opportunity.getClient();
        clientForm.patch(client);
        clientRepository.save(client);
    }

    public void addClientContact(int opportunityId, ClientContact clientContact) {
        Opportunity opportunity = findByIdOrError(opportunityId);
        Client client = opportunity.getClient();
        client.getClientContacts().add(clientContact);
        clientContactRepository.save(clientContact);
        clientRepository.save(client);
    }

    public void removeClientContact(int opportunityId, int clientContactId) {
        Opportunity opportunity = findByIdOrError(opportunityId);
        List<ClientContact> contacts = opportunity.getClient().getClientContacts();
        for (int i = 0; i < contacts.size(); i++) {
            ClientContact cc = contacts.get(i);
            if(cc.getId() == clientContactId) {
                contacts.remove(i);
                opportunityRepository.save(opportunity);
                clientContactRepository.deleteById(clientContactId);
                return;
            }
        }
        throw new NoSuchElementException("Client contact does not exist or does not belong to this opportunity's client.");
    }

    public void updateFirstMeeting(int opportunityId, FirstMeetingForm firstMeetingForm) {
        Opportunity opportunity = findByIdOrError(opportunityId);

        FirstMeeting firstMeeting = opportunity.getFirstMeeting();
        firstMeetingForm.patch(firstMeeting);
        firstMeetingRepository.save(firstMeeting);
    }

    public void updateDevelopment(int opportunityId, DevelopmentForm developmentForm) {
        Opportunity opportunity = findByIdOrError(opportunityId);

        Development development = opportunity.getDevelopment();
        developmentForm.patch(development);
        developmentRepository.save(development);
    }

    public void updatePOCDevelopment(int opportunityId, POCDevelopmentForm pocDevelopmentForm) {
        Opportunity opportunity = findByIdOrError(opportunityId);

        POCDevelopment pocDevelopment = opportunity.getPocDevelopment();
        pocDevelopmentForm.patch(pocDevelopment);
        pocDevelopmentRepository.save(pocDevelopment);
    }

    public void updatePOCInstallation(int opportunityId, POCInstallationForm pocInstallationForm) {
        Opportunity opportunity = findByIdOrError(opportunityId);

        POCInstallation pocInstallation = opportunity.getPocInstallation();
        pocInstallationForm.patch(pocInstallation);
        pocInstallationRepository.save(pocInstallation);
    }

    public void updateOrder(int opportunityId, OrderForm orderForm) {
        Opportunity opportunity = findByIdOrError(opportunityId);

        Order order = opportunity.getOrder();
        orderForm.patch(order);
        orderRepository.save(order);
    }
}
