function getDistance(point1,point2) {
    var R = 6371000; // Radius of the earth in m
    var dLat = deg2rad(point2.lat-point1.lat);  // deg2rad below
    var dLon = deg2rad(point2.lng-point1.lng);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(point1.lat)) * Math.cos(deg2rad(point2.lat)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return  parseFloat((R * c).toFixed(2)); // Distance in km
}
function deg2rad(deg) { return deg * (Math.PI/180); }

module.exports = {
    getDistanceMatrix: function (points) {
        var distanceMatrix=[];
        for(i in points){
            distanceMatrix[i] = new Array(points.length);
        }
        for(var i=0;i<points.length-1;i++){
            for(var j=i;j<points.length;j++){
                if(i==j){
                    distanceMatrix[i][j] = 0.00;
                }else{
                    distanceMatrix[i][j] = getDistance(points[i],points[j]);
                    distanceMatrix[j][i] = distanceMatrix[i][j];
                }

            }
        }
        return distanceMatrix;
    },
}