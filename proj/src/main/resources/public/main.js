$(document).ready(function() {
    /*
     * Code suivant l'appui du bouton "Ajouter un magasin".
     * On fait une requete POST pour ajouter les données du nouveau magasin.
     */
    $('#ajouterMagasin').click(function(){
		$.ajax({
		    type: "POST",
		    url: "http://localhost:8080/api/magasins",
		    data: JSON.stringify({ "addresse": $('#addresse').val(), "type": $('#type').val() }),
		    contentType: "application/json; charset=utf-8",
		    dataType: "json",
		    success: function(data) {
                console.log('ajout du magasin: ' + data.id);
                listerMagasins();
            }
		});
	})

    /*
     * Code suivant l'appui du bouton "Ajouter un produit".
     * On fait une requete POST pour ajouter les données du nouveau produit pour le magasin.
     */
    $('#ajouterProduit').click(function(){
        if (!$('#idProdMagasin').val())
            return;

		$.ajax({
		    type: "POST",
		    url: "http://localhost:8080/api/magasins/" + $('#idProdMagasin').val() + ("/produits"),
		    data: JSON.stringify({ "titre": $('#titre').val(), "type": $('#ptype').val(), "prix": $('#prix').val()}),
		    contentType: "application/json; charset=utf-8",
		    dataType: "json",
		    success: function(data) {
                console.log('ajout d\'un produit au magasin ' + $('#idProdMagasin').val());
                listerProduits($('#idProdMagasin').val());
            }
		});
    })

    /*
     * Code suivant l'appui du bouton "Supprimer" sur l'un des élements de la liste de magasin.
     * On fait une requete DELETE pour supprimer le magasin correspondant à l'id.
     */
	$('#listeMagasins').on("click", "li button", function(){
        let id = $(this).parent().attr('id');

        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/api/magasins/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                console.log("magasin " + id + "supprime");
	            listerMagasins();
            }
        });
	})

    /*
     * Code suivant l'appui du bouton "Supprimer" sur l'un des élements de la liste de produit.
     * On fait une requete DELETE pour supprimer le produit correspondant à l'idp du produit et l'idm du magasin.
     */
	$('#listeProduits').on("click", "li button", function(){
        let idm = $(this).parent().attr('idm');
        let idp = $(this).parent().attr('idp');

        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/api/magasins/" + idm + "/produits/" + idp,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                console.log("produit " + idp + " du magasin " + idm + "supprime");
	            listerMagasins();
	            listerProduits(idm);
            }
        });
	})

    /*
     * Code suivant l'appui du bouton "Lister les magasins".
     */
	$('#listerMagasins').click(function(){
	    listerMagasins();
	})

    /*
     * Code suivant l'appui du bouton "Lister les produits d'un magasin".
     */
	$('#listerProduits').click(function(){
	    if (!$('#idMagasin').val())
	        return;

	    listerProduits($('#idMagasin').val());
	})

    /*
     * Code pour obtenir les magasins et les inserer dans la liste.
     * On fait une requete GET pour obtenir tous les magasins.
     */
	function listerMagasins() {
	    $('#listeMagasins').empty();

		$.ajax({
    	    type: "GET",
    	    url: "http://localhost:8080/api/magasins",
    	    contentType: "application/json; charset=utf-8",
    	    dataType: "json",
    	    success: function(data){
                if (data.length == 0){
                    $('#listeMagasins').append("Aucun magasins");
                    return;
                }

                data.forEach(e => $('#listeMagasins').append(
                 '<li id=' + e.id + '>'
                 + '<button style="margin:4px">Supprimer</button>'
                 + 'ID: ' + e.id
                 + ' || ' + e.addresse
                 + ' || type: ' + e.type
                 + ' || ' + (e.produits.length ?? 0) + ' produit(s)'
                 + '</li>'));
    	    }
    	});
	}

    /*
     * Code pour obtenir les produits d'un magasin et les inserer dans la liste.
     * On fait une requete GET pour obtenir tous les produits du magasin.
     */
	function listerProduits(magId) {
	    document.getElementById('idMagasin').value = magId;
	    $('#listeProduits').empty();

	    $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/magasins/" + magId,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                if (!data.produits || data.produits.length == 0){
                    $('#listeProduits').append("Aucun produit pour ce magasin");
                    return;
                }

                for (let i = 0; i < data.produits.length; i++){
                    $('#listeProduits').append(
                        '<li idm=' + magId + ' idp=' + data.produits[i].id + '>'
                        + '<button style="margin:4px">Supprimer</button>'
                        + 'ID: ' + data.produits[i].id
                        + ' || ' + data.produits[i].titre
                        + ' || type: ' + data.produits[i].type
                        + ' || prix: ' + data.produits[i].prix
                        + '</li>');
                }
            }
        });
	}
});