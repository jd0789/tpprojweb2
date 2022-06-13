package com.example.demo.magasin;

import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("magasins")
public class MagasinResource {
    @Autowired
    private MagasinRepository repo;

    @GET @Produces(MediaType.APPLICATION_JSON)
    public List<Magasin> getMagasins() {
        List<Magasin> list = new ArrayList<>();
        repo.findAll().forEach(list::add);
        return list;
    }

    @GET @Path("{id}") @Produces(MediaType.APPLICATION_JSON)
    public Magasin getMagasin(@PathParam("id") Long id) {
        return repo.findById(id).get();
    }

    @POST @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
    public Magasin addMagasin(Magasin m) {
        return repo.save(m);
    }

    @POST @Path("{id}/produits") @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
    public Response addProduit(@PathParam("id") Long idMag, Produit p) {
        if (!repo.findById(idMag).isPresent())
            return Response.serverError().build();

        Magasin m = repo.findById(idMag).get();
        List<Produit> produits = m.getProduits();

        if (produits == null)
            produits = new ArrayList<Produit>();

        produits.add(p);
        m.setProduits(produits);
        repo.save(m);

        return Response.noContent().build();
    }

    @DELETE @Path("{id}") @Produces(MediaType.APPLICATION_JSON)
    public Response removeMagasin(@PathParam("id") Long id) {
        if (repo.findById(id).isPresent())
            repo.deleteById(id);

        return Response.noContent().build();
    }

    @DELETE @Path("{idm}/produits/{idp}") @Produces(MediaType.APPLICATION_JSON)
    public Response removeMagasin(@PathParam("idm") Long idm, @PathParam("idp") Long idp) {
        if (repo.findById(idm).isPresent()) {
            Magasin m = repo.findById(idm).get();
            List<Produit> produits = m.getProduits();

            if (produits == null)
                produits = new ArrayList<Produit>();

            produits.removeIf(p -> p.getId() == idp);

            m.setProduits(produits);
            repo.save(m);
        }

        return Response.noContent().build();
    }
}