/// <reference path="jquery-3.7.0.js"/>


$(() => {


    function getJson(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                success: data => resolve(data),
                error: err => reject(err),
            });
        });
    }


    $("#btnAll").on("click", async function () {

        try {

            const countries = await getJson("https://restcountries.com/v3.1/all");
            info(countries);
            getRegion(countries);
            displayCurrenciesObj(countries);

        } catch (err) {

            alert(err.message);

        }

    });

    function info(countries) {

        let total = "";
        let sum = 0;
        let content = "";
        let regionHtml = "";

        total += `${countries.length}`;

        for (const country of countries) {

            sum += country.population;
            content += getFirstTableHtml(country);
            regionHtml += getSecondTableHtml(country);
        }


        const avg = sum / countries.length;

        $("div").html(`<p> Total countries result: ${total}</p> <p> Total Countries Population: ${sum}</p> <p> Average Population: ${avg}</p>`);
        $("#tbody").html(content);
        $("#tbodyRegion").html(regionHtml);
        $("table").show();
    }


    function getFirstTableHtml(country) {

        return `
            <tr>
                <td>${country.name.common}</td>
                <td>${country.population}</td>
            </tr>
    `;

    }

    function getSecondTableHtml(reg) {

        let content = "";

        for (const region in reg) {

            content += `
        <tr>
             <td>${region}</td>
             <td>${reg[region]}</td>
        </tr> `;

        }

        return content;

    }

    function getRegion(countries) {


        let reg = {};

        for (const country of countries) {

            if (!reg[country.region]) {

                reg[country.region] = 0;
            }

            reg[country.region]++;
        }

        const regHtml = getSecondTableHtml(reg);

        $("#tbodyRegion").html(regHtml);



    }

    $("#SearchBtn").on("click", async function () {

        try {

            const text = $("#searchBox").val();
            const countries = await getJson("https://restcountries.com/v3.1/name/" + text);
            info(countries);
            getRegion(countries);
            displayCurrenciesObj(countries);


        } catch (err) {

            // alert(err.message);
            $("div").html("Invalid Information!");
        }

    });


    function displayCurrenciesObj(countries) {

        const cur = {};

        for (const country of countries) {
            const currencies = country.currencies;
            for (const key in currencies) {

                if (!cur[key]) {

                    cur[key] = 0;
                }
                cur[key]++;
            }
        }
        // console.log(cur);

        let content = "";
        for (const key in cur) {

            content += ` <tr>
                <td> ${key}</td>
                <td> ${cur[key]}</td>
            </tr>
            `;

        }
        $("#tbodyCur").append(content);
    }


});






