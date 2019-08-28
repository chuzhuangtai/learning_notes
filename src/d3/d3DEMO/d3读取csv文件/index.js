d3.csv('data.csv', type, function(data) {
    console.log(data);

    var bar_width = 50;
    bar_padding = 10;
    svg_width = (bar_width + bar_padding) * data.length;
    svg_height = 500;

    var scale = d3.scale
        .linear()
        .domain([0, d3.max(data,function(d){return d.population})])
        .range([svg_height, 0]);

    var svg = d3
        .select('body')
        .append('svg')
        .attr('width', svg_width)
        .attr('height', svg_height);

    var bar = svg
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', function(d, i) {
            return 'translate(' + i * (bar_width + bar_padding) + ',0)';
        });

    bar.append('rect')
        .attr({
            y: function(d, i) {
                return scale(d.population);
            },
            width: bar_width,
            height: function(d, i) {
                return svg_height - scale(d.population);
            }
        })
        .style('fill', 'blue');
    bar.append('text')
        .text(function(d) {
            return d.year;
        })
        .attr({
            "x": bar_width/2,
            "y": function(d, i) {
                return scale(d.population);
            },
            dy: 15,
            'text-anchor': 'end'
        });
});
function type(d) {
    //把字符串转换成数据类型格式
    d.population = +d.population;
    return d;
}
