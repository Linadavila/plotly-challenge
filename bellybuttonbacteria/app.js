//read json File
function init() {

    d3.json("samples.json").then((data) => {
        console.log(data);

    });
};

init();
//bbdata is data
// d is data
// IDs is ids
//dropdownoptions is dataset

//build dropdown menu
function dropdown() {

    d3.json("samples.json").then((data) => {
        var ids = data.names;
        console.log(data.names);
        var dataset = d3.select("#selDataset");
        var option;
        for (var i = 0; i < ids.length; i++) {
            option = dataset.append("option").text(ids[i]);
        }
    })
};
dropdown();

//funciton to change as per selection
function optionChanged(idselected) {
    getdata(idsselected)
};
