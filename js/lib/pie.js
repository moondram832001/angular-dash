Raphael.fn.pieChart = function (cx, cy, r, values, labels, stroke) {
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();
    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }
    var angle = 0,
        total = 0,
        start = 0,
        process = function (j,starter,type) {
            var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                color = Raphael.hsb(starter, .75, 1),
                //color = Raphael.hsb(.114, .80, .79),
                pass = '#5CAD4E',
                fail = '#DD762C',
                ms = 500,
                delta = 30,
                bcolor = Raphael.hsb(starter, 1, 1),
                //"90-" + bcolor + "-" + color
                //p = sector(cx, cy, r, angle, angle + angleplus, {fill: "90-" + bcolor + "-" + color , stroke: stroke, "stroke-width": 3}),
                p = sector(cx, cy, r, angle, angle + angleplus, {fill: type ? pass:fail , stroke: stroke, "stroke-width": 1}),
                txt = paper.text(cx + (type ? 25:35) * Math.cos(-popangle * rad), cy + (type ? 30:35) * Math.sin(-popangle * rad), labels[j]).attr({fill: '#000', stroke: "none", opacity: 1, "font-size": 12});
     
            angle += angleplus;
            chart.push(p);
            chart.push(txt);
            start += .1;
        };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
  //  total = 100;
    for (i = 0; i < ii; i++) {
  //      process(i);
    }
    process(0,.37,1);
    process(1,1,0);
    return chart;
};

