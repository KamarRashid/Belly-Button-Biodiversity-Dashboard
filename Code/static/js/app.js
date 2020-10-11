// Test subject ID dropdown menu
function subjectDropDown() {
    // Read in data
    d3.json('Data/samples.json').then((data) => {
        // Add list of subjects to dropdown menu
        var dropDownMenu = d3.select('#selDataset');
        var subjectList = data.names
        subjectList.forEach((subject) => {
            dropDownMenu
                .append('option')
                .text(subject)
                .property('value', subject)
        })

    });
};
// Call function to create the dropdown list
subjectDropDown()

// Initialize the page with a default plot of first subject in data sample
function init() {
    // Read in data
    d3.json('Data/samples.json').then((data) => {
        var firstSubject = data.names[0];

        createBarChart(firstSubject);
        createBubbleChart(firstSubject);
        createDemographics(firstSubject);
    })
};
// Call function to intialize dashboard
init()

// On change to the DOM function - get new subject ID when changed
function optionChanged(newSample) {
    var dropDownMenu = d3.select('#selDataset');
    var subject = dropDownMenu.property('value');
    createBarChart(subject);
    createBubbleChart(subject);
    createDemographics(subject);
};

// Horizontal bar chart function
function createBarChart(subject) {
    // Read in data
    d3.json('Data/samples.json').then((data) => {
        var samples = data.samples;
        var filterSubject = samples.filter(sample => sample.id == subject);
        var results = filterSubject[0];
        
        console.log(data)
        console.log(filterSubject)
        console.log(results)

        // Create variables for bar chart
        var sampleValues = results.sample_values;
        var otuIDs = results.otu_ids;
        var otuLabels = results.otu_labels;

        console.log(sampleValues)
        console.log(otuIDs)
        console.log(otuLabels)
        
        // Bar data trace
        var trace1 = [{
            type: 'bar',
            x: sampleValues.slice(0, 10).sort((firstNum, secondNum) => firstNum - secondNum),
            y: otuIDs.slice(0, 10).sort((firstNum, secondNum) => firstNum - secondNum).map(OTUID => `OTU ${OTUID}`),
            hovertext: otuLabels.slice(0, 10).sort((firstNum, secondNum) => firstNum - secondNum),
            orientation: 'h',
        }]

        // Bar layout
        var layout = {
            // title: `Subject ${subject}: Top 10 OTUs` 
            margin: {
                t: 0,
                l: 150
            },
        }

        // Update bar plot
        Plotly.newPlot('bar', trace1, layout);
        // Plotly.restyle('bar', trace1, layout);
    });
}

// Bubble chart function
function createBubbleChart(subject) {
    // Read in data
    d3.json('Data/samples.json').then((data) => {
        var samples = data.samples;
        var filterSubject = samples.filter(sample => sample.id == subject);
        var results = filterSubject[0];

        // Create variables for bubble chart
        var sampleValues = results.sample_values;
        var otuIDs = results.otu_ids;
        var otuLabels = results.otu_labels;
        
        console.log(sampleValues)
        console.log(otuIDs)
        console.log(otuLabels)

        // Bubble data trace
        var trace2 = [{
            mode: 'markers',
            x: otuIDs,
            y: sampleValues,
            text: otuLabels,
            marker: {
                size: sampleValues,
                color: otuIDs
            }
        }];

        // Bubble layout
        var layout = {
            // title: `Subject ${subject}: OTUs`,
            xaxis: { title: "UTO-ID" },
            // showlegend: true
        }

        // Update bubble plot
        Plotly.newPlot('bubble', trace2, layout);
        // Plotly.restyle('bubble', trace2, layout);
    });
}

// Demographic info function
function createDemographics(subject) {
    // Read in data
    d3.json('Data/samples.json').then((data) => {
        var samples = data.samples;
        var filterSubject = samples.filter(sample => sample.id == subject);
        var results = filterSubject[0];
    });
}
// createBarChart('940')