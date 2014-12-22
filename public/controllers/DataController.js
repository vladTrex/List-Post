app.controller('DataCtrl', ['$scope', '$controller', 'renderCharts', 'Patient', 'Data', 'RetrieveData',
    function ($scope, $controller, renderCharts, Patient, Data, RetrieveData) {
        $scope.showTempForm = false;
        $scope.showPulseForm = false;
        $scope.toggleTemperatureForm = function () {
            $scope.showTempForm = !$scope.showTempForm;
        };
        $scope.togglePulseForm = function () {
            $scope.showPulseForm = !$scope.showPulseForm;
        };

        $scope.addTemp = function (name, id, date, temperature) {
            Data.addTemperatureById(id, date, temperature);
            setTimeout(function () {
                $scope.$apply(function () {
                    Patient.getTemperatureById(id)
                            .then(function (result) {
                                var obj = RetrieveData.retrieveTemperature(result.data);
                                renderCharts.renderTempChart(name, obj.dates, obj.temperature);
                                $scope.tempdates = obj.dates;
                                $scope.tempvalues = obj.temperature;
                                $scope.showTempForm = false;

                            });

                });
            }, 2000);
        };

        $scope.addPulse = function (name, id, date, pulse) {
            Data.addPulseById(id, date, pulse);
            setTimeout(function () {
                $scope.$apply(function () {
                    Patient.getPulseById(id)
                            .then(function (result) {
                                var obj = RetrieveData.retrievePulse(result.data);
                                renderCharts.renderPulseChart(name, obj.dates, obj.pulse);
                                $scope.pulsedates = obj.dates;
                                $scope.pulses = obj.pulse;
                                $scope.showPulseForm = false;
                            });
                });
            }, 2000);
        };

    }]);