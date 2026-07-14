/* =====================================
   DATA DUMMY PREDIKSI XGBOOST
===================================== */


const predictions = [

    {
        result: "Normal",
        confidence: 92,
        insights:
        "Semua parameter laboratorium berada dalam batas normal. Fungsi hati menunjukkan kondisi yang baik."
    },


    {
        result: "Hepatitis",
        confidence: 85,
        insights:
        "Ditemukan peningkatan nilai ALT, AST, dan bilirubin yang dapat mengindikasikan gangguan fungsi hati."
    },


    {
        result: "Fatty Liver",
        confidence: 78,
        insights:
        "Profil laboratorium menunjukkan kemungkinan gangguan metabolisme hati dan penurunan fungsi hati."
    },


    {
        result: "Cirrhosis",
        confidence: 88,
        insights:
        "Nilai albumin rendah dan rasio A/G abnormal menunjukkan kemungkinan kerusakan hati tingkat lanjut."
    }

];





/* =====================================
   AMBIL DATA FORM
===================================== */


function getFormData(){

    const form =
    document.getElementById("predictionForm");


    return {

        age: form.age.value,


        gender:
        form.gender.value === "male"
        ? "Laki-laki"
        : "Perempuan",


        totalBilirubin:
        form.totalBilirubin.value,


        directBilirubin:
        form.directBilirubin.value,


        alkPhos:
        form.alkPhos.value,


        alt:
        form.alt.value,


        ast:
        form.ast.value,


        totalProtein:
        form.totalProtein.value,


        albumin:
        form.albumin.value,


        agRatio:
        form.agRatio.value

    };

}





/* =====================================
   GENERATE SHAP VALUES
===================================== */


function generateShapValues(){


    const data = getFormData();



    const features = [


        {
            name:"Total Bilirubin",
            value:data.totalBilirubin,
            contribution:Math.random()*100
        },


        {
            name:"Direct Bilirubin",
            value:data.directBilirubin,
            contribution:Math.random()*100
        },


        {
            name:"Alkaline Phosphatase",
            value:data.alkPhos,
            contribution:Math.random()*100
        },


        {
            name:"ALT (SGPT)",
            value:data.alt,
            contribution:Math.random()*100
        },


        {
            name:"AST (SGOT)",
            value:data.ast,
            contribution:Math.random()*100
        },


        {
            name:"Total Protein",
            value:data.totalProtein,
            contribution:Math.random()*100
        },


        {
            name:"Albumin",
            value:data.albumin,
            contribution:Math.random()*100
        },


        {
            name:"A/G Ratio",
            value:data.agRatio,
            contribution:Math.random()*100
        }


    ];



    return features
    .sort((a,b)=>b.contribution-a.contribution)
    .slice(0,6);


}






/* =====================================
   SUBMIT PREDIKSI
===================================== */


document
.getElementById("predictionForm")
.addEventListener("submit",function(e){


    e.preventDefault();



    const prediction =
    predictions[
        Math.floor(
            Math.random()*predictions.length
        )
    ];



    showResults(prediction);



});







/* =====================================
   TAMPILKAN HASIL
===================================== */


function showResults(prediction){


    const data =
    getFormData();



    const shapData =
    generateShapValues();





    // hasil prediksi

    document
    .getElementById("resultPrediction")
    .innerText =
    prediction.result;



    document
    .getElementById("confidenceScore")
    .innerText =
    prediction.confidence;



    document
    .getElementById("confidenceFill")
    .style.width =
    prediction.confidence+"%";






    // informasi pasien


    document
    .getElementById("patientInfoGrid")
    .innerHTML = `


    <div class="info-item">

        <div class="info-label">
        Usia
        </div>

        <div class="info-value">
        ${data.age} Tahun
        </div>

    </div>




    <div class="info-item">

        <div class="info-label">
        Jenis Kelamin
        </div>

        <div class="info-value">
        ${data.gender}
        </div>

    </div>




    <div class="info-item">

        <div class="info-label">
        Total Bilirubin
        </div>

        <div class="info-value">
        ${data.totalBilirubin}
        </div>

    </div>




    <div class="info-item">

        <div class="info-label">
        ALT
        </div>

        <div class="info-value">
        ${data.alt}
        </div>

    </div>




    <div class="info-item">

        <div class="info-label">
        AST
        </div>

        <div class="info-value">
        ${data.ast}
        </div>

    </div>




    <div class="info-item">

        <div class="info-label">
        Albumin
        </div>

        <div class="info-value">
        ${data.albumin}
        </div>

    </div>


    `;







    // SHAP


    const max =
    Math.max(
        ...shapData.map(
            x=>x.contribution
        )
    );



    let shapHTML="";



    shapData.forEach(item=>{


        let width =
        (item.contribution/max)*100;



        shapHTML += `


        <div class="shap-item">


            <div class="shap-label">
            ${item.name}
            </div>



            <div class="shap-bar-container">


                <div 
                class="shap-bar"
                style="width:${width}%"
                >

                </div>


            </div>



            <div class="shap-value">
            ${item.contribution.toFixed(2)}
            </div>


        </div>


        `;


    });



    document
    .getElementById("shapValues")
    .innerHTML =
    shapHTML;







    // insight


    document
    .getElementById("clinicalInsights")
    .innerHTML = `


    <p>
    <b>Prediksi:</b>
    ${prediction.result}
    </p>


    <br>


    <p>
    ${prediction.insights}
    </p>


    <br>


    <small>
    ⚠ Hasil ini merupakan prediksi AI dan bukan diagnosis medis resmi.
    Konsultasikan dengan tenaga medis profesional.
    </small>


    `;







    // pindah halaman


    document
    .getElementById("formPage")
    .classList
    .add("hidden");



    document
    .getElementById("resultPage")
    .classList
    .add("active");


}








/* =====================================
   KEMBALI KE FORM
===================================== */


function backToForm(){


    document
    .getElementById("resultPage")
    .classList
    .remove("active");



    document
    .getElementById("formPage")
    .classList
    .remove("hidden");


}







/* =====================================
   DOWNLOAD HASIL
===================================== */


function downloadResult(){


    const data =
    getFormData();



    const result =
    document
    .getElementById("resultPrediction")
    .innerText;



    const confidence =
    document
    .getElementById("confidenceScore")
    .innerText;





    const text = `


HASIL KLASIFIKASI PENYAKIT HATI
================================


Prediksi :
${result}


Confidence :
${confidence}%



DATA PASIEN
-----------

Usia :
${data.age}


Jenis Kelamin :
${data.gender}




PARAMETER LABORATORIUM
----------------------

Total Bilirubin :
${data.totalBilirubin}


Direct Bilirubin :
${data.directBilirubin}


Alkaline Phosphatase :
${data.alkPhos}


ALT :
${data.alt}


AST :
${data.ast}


Total Protein :
${data.totalProtein}


Albumin :
${data.albumin}


A/G Ratio :
${data.agRatio}



================================

Model :
XGBoost + SHAP Explainable AI


Catatan:
Hasil bukan diagnosis medis resmi.


`;





    const blob =
    new Blob(
        [text],
        {
            type:"text/plain"
        }
    );



    const url =
    URL.createObjectURL(blob);



    const link =
    document.createElement("a");


    link.href=url;


    link.download=
    "hasil_prediksi_liver.txt";



    link.click();



    URL.revokeObjectURL(url);



}