package org.cours.SpringDataRest.modele;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
public interface ProprietaireRepo extends CrudRepository<Proprietaire, Long> {
}