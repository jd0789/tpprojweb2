package com.example.demo.magasin;

import javax.persistence.*;

@Entity
public class Produit  {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String titre;
    private int type;
    private int prix;

    public Produit() {
        super();
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTitre() {
        return titre;
    }
    public void setTitre(String titre) {
        this.titre = titre;
    }
    public int getType() {
        return type;
    }
    public void setType(int type) {
        this.type = type;
    }
    public int getPrix() {
        return prix;
    }
    public void setPrix(int prix) {
        this.prix = prix;
    }
}
