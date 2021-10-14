$(function () {
    const termekek = [];
    //$("#tablazat tr td").eq().append('<input type="button" id="torol" value="Töröl">');
    let faljnev ="jsontermekek.json"; 
    adatbeolvas(faljnev,termekek,termekKiir); 

// felirat kezelő esemény kezelőre
//mezökbe kerülnek a kulcshoz tartozo értékek
let id = -1;
$("#tablazat").on("click","button",function () {
    
   // let id=$(this).attr("dataId");
    console.log(id);
    id = $(this).attr("dataId");
    let adatok = termekek[id];
    $("#termeknev").val(adatok.Terméknév);
    $("#leiras").val(adatok.Leírás);
    $("#keszlet").val(adatok.Készlet);
    $("#ar").val(adatok.Ár);
});
$("#ok").on("click",function () {
    if (id>=0) {
        
        termekek[id].Terméknév= $("#termeknev").val();
        termekek[id].Leírás=$("#leiras").val();
        termekek[id].Készlet=$("#keszlet").val();
        termekek[id].Ár=$("#ar").val();
        $("#tablazat").empty();
        termekKiir(termekek);
    }
    
});

        function adatbeolvas(faljnev, tomb,myCallbanck) {
            $.ajax({
                    url: faljnev,
                    success: function (result) { 
                      //  console.log(result);  
                        result.forEach(element => {
                           // console.log(element); 
                            tomb.push(element); 
                        });
                        //console.log(tomb);
                        myCallbanck(tomb);
     
                        
                    }
                    
                }
            );
        }
    

    function termekKiir(tomb) {
        console.log("termékek");
        console.log(tomb);
        //táblázat
        $("#tablazat").append("<table>");
        //fejléc-oszlopok ,mezők-kulcsok
        // let txt = "<th>Terméknév</th><th>Leírás</th><th>Készlet</th><th>Ár</th>"F       
       let txt= "<tr>";
        for (const key in tomb[0]) {
            txt+="<th>"+key+"</th>";
        }             
         txt+= "</tr>";
        //sorok - egy tömb elem (egy konkrét objektum)

        /*for (let index = 0; index < termekek.length; index++) {
            const element = tomb[index];
            
        }*/
        tomb.forEach((elem,index)=>{
            txt+= "<tr>";
        for (const key in elem) {
            txt+="<th>"+elem[key]+"</th>";
        }     
        txt+="<td><button dataId='"+index+"'>Modosit</button><td>"; 
         txt+= "</tr>";   
        });           
        $("#tablazat table").html(txt);
        

        
    }
});