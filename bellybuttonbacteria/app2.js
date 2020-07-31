//read json File
function init() {

    d3.json("samples.json").then((data) => {
        console.log(data);

    });
};

init();


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

//funciton to change plots as per selection
function optionChanged(idselected) {
    getdata(idselected)
};

//function to build the plots per selected data
function getdata(idselected) {
    
    //get filtered values to update plots
    d3.json("samples.json").then((data) => {
        console.log(data);

        var datafiltered = data.samples.filter(row => row.id === idselected);
        console.log(datafiltered);

        var values = datafiltered[0].sample_values;
        var otuID = datafiltered[0].otu_ids;
        var otuLabel = datafiltered[0].otu_labels;
        var data_idselected = values.map((value, index) => {
            return {
                values: value,
                otuID: otuID[index],
                otuLabel: otuLabel[index]
            }
        });
        console.log(data_idselected);

        var sortedvalues = data_idselected.sort((a, b) => b.values - a.values);
        var reversedvalues = sortedvalues.slice(0, 10).reverse()
 


        //build Bar Graph
        var values_to_graph_bar = reversedvalues.map(x => x.values);
        var otu_ids_bar = reversedvalues.map(x => `OTU${x.otuID}`);
        var otu_label_bar = reversedvalues.map(x => x.otuLabel);

        var trace1 = {
            x: values_to_graph_bar,
            y: otu_ids_bar,
            text: otu_label_bar,
            type: "bar",
            orientation: "h"
        };

        var data_bar_graph = [trace1];

        var layout = {
            title: "Top 10 OTUs",
            xaxis: { title: "Samples" },
            yaxis: { title: "OTUs IDs" }
        };

        Plotly.newPlot("bar", data_bar_graph, layout)



        //build Bubble Chart
        var values_to_graph_bubble = data_idselected.map(x => x.values);
        var otu_ids_bubble = data_idselected.map(x => x.otuID);
        var otu_label_bubble = data_idselected.map(x => x.otuLabel);

        var trace2 = {
            x: otu_ids_bubble,
            y: values_to_graph_bubble,
            text: otu_label_bubble,
            mode: "markers",
            marker: {
                color: otu_ids_bubble,
                size: values_to_graph_bubble
            }
        };

        var data_bubble = [trace2];

        var layout2 = {
            title: "OTUs IDs - bubble view",
            xaxis: { title: "OTUS ids" },
            yaxis: { title: "Sample Values" }
        };

        Plotly.newPlot("bubble", data_bubble, layout2)

        

        //build Demo table
        var demo_data = data.metadata;
        console.log(demo_data);
        
        var demo_data_filtered = demo_data.filter(row => row.id == idselected)[0];
        console.log(demo_data_filtered);

        var panel_body = d3.select(".panel-body");

        panel_body.html("");

        Object.entries(demo_data_filtered).forEach(([key, value]) => {
            panel_body.append("p").text(`${key}:${value}\n`)
        });

    });

};