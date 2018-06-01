package com.nix.demo.repository;

import java.util.List;

import com.nix.demo.entity.Contact;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "contact", path = "contact")
public interface ContactRepository extends CrudRepository<Contact, Long> {

    List<Contact> findByName(@Param("name") String name);
}
