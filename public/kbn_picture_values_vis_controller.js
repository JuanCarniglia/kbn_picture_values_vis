define(function (require) {

  var module = require('ui/modules').get('kibana/kbn_picture_values_vis', ['kibana']);

  var d3 = require('d3');
  var $ = require('jquery');
  var _ = require('lodash');
  var numeral = require('numeral');

  module.controller('KbnPictureValuesVisController',
    function ($scope, $element, $rootScope, Private) {

      var pictureValuesAggResponse = Private(require('./lib/agg_response'));

      var svgRoot = $element[0];

      var _render = function _render(results) {

        _.each(results, function (d, i) {

          $(svgRoot).empty();

          var svgResult = d3.select(svgRoot)
            .append('svg')
            .attr('role', 'values_container')
            .attr('class', 'svgNumberContainer')
            .style('width', '200px')
            .append('g');

          svgResult.append('svg:text')
            .attr('class', 'svgNumberLabel')
            .attr('x', '0px')
            .attr('y', '2px')
            .attr('ng-style', '{\'font-size\': vis.params.fontSizeLabel+\'pt\'}')
            .style('font-size', $scope.vis.params.fontSizeLabel)
            .text(d.label);

          var valueFormatted = d.formatNumber ? numeral(d.value).format(d.formatNumber) : d.value;

          svgResult.append('svg:text')
            .attr('class', 'svgNumberValue')
            .attr('x', '0px')
            .attr('y', '30px')
            .attr('ng-style', '{\'font-size\': vis.params.fontSizeValue+\'pt\'}')
            .style('font-size', $scope.vis.params.fontSizeValue)
            .style('fill', d.valueColor)
            .text(valueFormatted);

          if ($scope.vis.params.showPictures) {
            svgResult.append('svg:text')
              .attr('class', 'fa svgNumberPicture')
              .attr('x', '145px')
              .attr('y', '100px')
              .text(d.letter);
          }
        });
      };

      $scope.$watch('esResponse', function (resp) {
        if (resp) {
          _render(pictureValuesAggResponse($scope.vis, resp));
        }
      });
    });
});
