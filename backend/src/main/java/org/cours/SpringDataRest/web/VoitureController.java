package org.cours.SpringDataRest.web;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.cours.SpringDataRest.modele.Voiture;
import org.cours.SpringDataRest.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import io.swagger.v3.oas.annotations.Operation;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    @Operation(summary = "Récupérer toutes les voitures")
    @GetMapping("/voitures")
    public Iterable<Voiture> getVoitures(){
        return voitureRepo.findAll();
    }

    @Operation(summary = "Ajouter une nouvelle voiture")
    @PostMapping("/voitures")
    public Voiture addVoiture(@RequestBody Voiture voiture){
        return voitureRepo.save(voiture);
    }
}