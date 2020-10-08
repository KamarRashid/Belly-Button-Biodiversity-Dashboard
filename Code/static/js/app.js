// Initialize the page with a default plot
function init() {

};

// On change to the DOM function
function optionChanged(newSample) {

};

// Horizontal bar chart function
function createBarChart(subject) {

    // Read in data
    d3.json('Data/samples.json').then((data) => {
        var samples = data.samples;
        var filterSubject = samples.filter(sample => sample.id == subject);
        var results = filterSubject[0]
        
        console.log(data)
        console.log(filterSubject)
        console.log(results)

        // Create variables for bar chart
        var sampleValues = results.sample_values;
        var otuIDs = results.otu_ids;
        var otuLabels = results.otu_labels;

        console.log(sampleValues)
        
        // Bar data trace
        var trace = {
            type: 'bar',

        }
    });
}
createBarChart('940')