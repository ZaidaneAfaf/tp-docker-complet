package org.cours.SpringDataRest.modele;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:3000")
public interface VoitureRepo extends CrudRepository<Voiture, Long> {

    // Sélectionnez les voitures par marque
    List<Voiture> findByMarque(@Param("marque") String marque);

    // Sélectionnez les voitures par couleur
    List<Voiture> findByCouleur(@Param("couleur") String couleur);

    // Sélectionnez les voitures par année
    List<Voiture> findByAnnee(@Param("annee") int annee);

    // Sélectionnez les voitures par marque et modele
    List<Voiture> findByMarqueAndModele(@Param("marque") String marque, @Param("modele") String modele);

    // Sélectionnez les voitures par marque ou couleur
    List<Voiture> findByMarqueOrCouleur(@Param("marque") String marque, @Param("couleur") String couleur);

    // Sélectionnez les voitures par marque et trier par annee
    List<Voiture> findByMarqueOrderByAnneeAsc(@Param("marque") String marque);
}