package com.example.demo.magasin;

import javax.persistence.*;
import java.util.List;

@Entity
public class Magasin  {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String addresse;
    private int type;

    @OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private List<Produit> produits;

    public Magasin() {
        super();
    }
    public Magasin(String addresse, int type) {
        super();
        this.addresse = addresse;
        this.type = type;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getAddresse() {
        return addresse;
    }
    public void setAddresse(String addresse) {
        this.addresse = addresse;
    }
    public int getType() {
        return type;
    }
    public void setType(int type) {
        this.type = type;
    }

    public List<Produit> getProduits() {
        return produits;
    }
    public void setProduits(List<Produit> produits) {
        this.produits = produits;
    }
}