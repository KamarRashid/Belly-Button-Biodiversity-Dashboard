// Initialize the page with a default plot of first subject in data sample
function init() {
    // Read in data
    d3.json('Data/samples.json').then((data) => {
        var firstSubject = data.names[0];
        
        // Create charts based on first subject
        createBarChart(firstSubject);
        createBubbleChart(firstSubject);
        createDemographics(firstSubject);
        createGaugeChart(firstSubject);
        
        // Call function to create the dropdown list
        subjectDropDown()
    })
};
// Call function to intialize dashboard
init()

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

// On change to the DOM function - get new subject ID when changed
function optionChanged(newSample) {
    var dropDownMenu = d3.select('#selDataset');
    var subject = dropDownMenu.property('value');
    createBarChart(subject);
    createBubbleChart(subject);
    createDemographics(subject);
    createGaugeChart(subject);
};

// Horizontal bar chart function
function createBarChart(subject) {
    // Read in data
    d3.json('Data/samples.json').then((data) => {
        var samples = data.samples;
        var filterSubject = samples.filter(sample => sample.id == subject);
        var results = filterSubject[0];

        // Create variables for bar chart
        var sampleValues = results.sample_values;
        var otuIDs = results.otu_ids;
        var otuLabels = results.otu_labels;
        
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
            margin: {
                t: 0,
            },
            // showlegend: true
        }

        // Update bubble plot
        Plotly.newPlot('bubble', trace2, layout);
    });
}

// Demographic info function
function createDemographics(subject) {
    // Read in data
    d3.json('Data/samples.json').then((data) => {
        var metadata = data.metadata;
        var filterMetadata = metadata.filter(sample => sample.id == subject);
        var results = filterMetadata[0];
        
        var metadataPanel = d3.select('#sample-metadata')

        // clear the medatadata panel
        metadataPanel.html("");

        // Use d3 object entries to update metadata panel
        Object.entries(results).forEach(([key, value]) => {
            metadataPanel.append('tr').text(`${key}: ${value}`);
        });
    });
}

// Guage chart function
function createGaugeChart(subject) {
    
    // Read in data
    d3.json('Data/samples.json').then((data) => {
        var metadata = data.metadata;
        var filterMetadata = metadata.filter(sample => sample.id == subject);
        var results = filterMetadata[0];
        
        // Subject washing frequency
        wFreq = results.wfreq

        tickVals = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5,]
        tickText = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9']

        // Guage data trace 
        var trace3 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: parseFloat(wFreq),
                title: { text: 'Scrubs per Week' },
                type: 'indicator',
                
                mode: 'gauge+number',
                gauge: {
                    axis: { range: [null, 9], ticks: '', tickmode: 'array', tickvals: tickVals, ticktext: tickText},
                    bar: { color: 'rgb(103,0,13)' },
                    steps: [
                        { range: [0, 1], color: 'rgb(255,255,229)'},
                        { range: [1, 2], color: 'rgb(247,252,185)'},
                        { range: [2, 3], color: 'rgb(217,240,163)'},
                        { range: [3, 4], color: 'rgb(173,221,142)'},
                        { range: [4, 5], color: 'rgb(120,198,121)'},
                        { range: [5, 6], color: 'rgb(65,171,93)'},                        
                        { range: [6, 7], color: 'rgb(35,132,67)'},
                        { range: [7, 8], color: 'rgb(0,104,55)'},
                        { range: [8, 9], color: 'rgb(0,69,41)'},
                    ]
                }
            }
        ];

        var layout = {
            title: 'Belly Button Washing Frequency',
            width: 400,
            height: 400,
            margin: { t: 25, l: 20, r: 20 }
        };
        
        // Update guage chart
        Plotly.newPlot("gauge", trace3, layout);
    });
}  
