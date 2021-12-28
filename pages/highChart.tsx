import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const testSeries = [
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
	0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
];
const testSeriesTwo = [
	0.5, 0.5075, 0.4985, 0.493, 0.4945, 0.489, 0.5095, 0.5025, 0.49, 0.486, 0.502, 0.5035, 0.478, 0.4915, 0.475, 0.4875,
	0.4865, 0.4835, 0.4925, 0.5095, 0.498, 0.51, 0.526, 0.5255, 0.531, 0.5565, 0.5455, 0.5115, 0.512, 0.5045, 0.522,
	0.517, 0.508, 0.509, 0.5225, 0.5155, 0.501, 0.4855, 0.496, 0.5005, 0.5025, 0.5135, 0.4985, 0.5305, 0.521, 0.5185,
	0.5125, 0.5185, 0.529, 0.536, 0.526, 0.5155, 0.5175, 0.5105, 0.5165, 0.5115, 0.509, 0.499, 0.4905, 0.4915, 0.4815,
	0.4875, 0.4925, 0.5, 0.496, 0.503, 0.504, 0.5175, 0.514, 0.5005, 0.482, 0.481, 0.4655, 0.4755, 0.4695, 0.4675, 0.4655,
	0.4495, 0.4555, 0.4545, 0.4575, 0.4475, 0.451, 0.448, 0.447, 0.434, 0.464, 0.4385, 0.4295, 0.45, 0.4575, 0.448, 0.445,
	0.4295, 0.422, 0.417, 0.428, 0.4425, 0.469, 0.4705, 0.4605, 0.469, 0.477, 0.464, 0.4845, 0.4715, 0.464, 0.4385, 0.426,
	0.451, 0.4295, 0.417, 0.4275, 0.4265, 0.4175, 0.395, 0.4055, 0.407, 0.4085, 0.4015, 0.3995, 0.3955, 0.395, 0.4025,
	0.389, 0.3955, 0.385, 0.3785, 0.397, 0.3845, 0.3835, 0.39, 0.393, 0.393, 0.3765, 0.3545, 0.334, 0.3265, 0.327, 0.345,
	0.34, 0.359, 0.388, 0.379, 0.3785, 0.3625, 0.3605, 0.3535, 0.3525, 0.356, 0.3605, 0.3485, 0.338, 0.3375, 0.3315,
	0.3305, 0.33, 0.3295, 0.3375, 0.3405, 0.329, 0.3395, 0.3395, 0.3415, 0.342, 0.3305, 0.3355, 0.3495, 0.346, 0.366,
	0.374, 0.362, 0.3665, 0.361, 0.3665, 0.37, 0.38, 0.3955, 0.3855, 0.388, 0.3885, 0.397, 0.382, 0.369, 0.373, 0.3665,
	0.3715, 0.3455, 0.3365, 0.346, 0.3365, 0.3295, 0.338, 0.3395, 0.333, 0.3455, 0.3455, 0.3585, 0.356, 0.353, 0.349,
	0.338, 0.3315, 0.3115, 0.2995, 0.2945, 0.3105, 0.317, 0.31, 0.2895, 0.2935, 0.2985, 0.3045, 0.298, 0.301, 0.3115,
	0.3285, 0.328, 0.339, 0.3365, 0.325, 0.331, 0.332, 0.347, 0.339, 0.3705, 0.358, 0.3285, 0.3315, 0.336, 0.354, 0.356,
	0.362, 0.365, 0.362, 0.383, 0.386, 0.3865, 0.396, 0.4225, 0.4115, 0.404, 0.3865, 0.382, 0.3745, 0.373, 0.3685, 0.3535,
	0.3725, 0.3525, 0.3335, 0.341, 0.332, 0.327, 0.317, 0.323, 0.314, 0.326, 0.3165, 0.324, 0.32, 0.317, 0.3085, 0.3145,
	0.33, 0.351, 0.3475, 0.3555, 0.3435, 0.346, 0.348, 0.3575, 0.361, 0.3315, 0.3455, 0.357, 0.3705, 0.3435, 0.357,
	0.3655, 0.375, 0.3655, 0.358, 0.3415, 0.3535, 0.347, 0.3735, 0.374, 0.392, 0.3785, 0.379, 0.3505, 0.3575, 0.3495,
	0.3335, 0.3395, 0.33, 0.3165, 0.3195, 0.3315, 0.3445, 0.355, 0.36, 0.338, 0.3585, 0.356, 0.3405, 0.3455, 0.337, 0.344,
	0.3465, 0.335, 0.328, 0.32, 0.313, 0.2895, 0.2735, 0.2645, 0.2615, 0.247, 0.2415, 0.251, 0.2495, 0.235, 0.234, 0.2455,
	0.258, 0.2625, 0.2585, 0.243, 0.226, 0.225, 0.2255, 0.233, 0.241, 0.226, 0.229, 0.2165, 0.2215, 0.2155, 0.2105, 0.215,
	0.229, 0.2265, 0.225, 0.212, 0.2085, 0.203, 0.224, 0.2215, 0.219, 0.2225, 0.207, 0.1995, 0.206, 0.212, 0.21, 0.21,
	0.2175, 0.223, 0.226, 0.222, 0.222, 0.2155, 0.218, 0.228, 0.2215, 0.216, 0.2035, 0.2185, 0.208, 0.21, 0.2105, 0.198,
	0.197, 0.1995, 0.2025, 0.201, 0.192, 0.1865, 0.194, 0.194, 0.192, 0.1795, 0.1615, 0.164, 0.17, 0.1585, 0.1675, 0.167,
	0.153, 0.146, 0.1485, 0.1495, 0.1465, 0.1535, 0.173, 0.167, 0.174, 0.1765, 0.1835, 0.181, 0.1745, 0.1625, 0.155,
	0.1575, 0.15, 0.146, 0.1275, 0.1405, 0.1555, 0.1445, 0.141, 0.1325, 0.1345, 0.1245, 0.12, 0.1205, 0.1215, 0.124,
	0.109, 0.1095, 0.1175, 0.1105, 0.117, 0.114, 0.102, 0.113, 0.1065, 0.113, 0.109, 0.101, 0.1035, 0.106, 0.103, 0.095,
	0.099, 0.1045, 0.097, 0.0965, 0.0935, 0.086, 0.0885, 0.0805, 0.082, 0.0785, 0.075, 0.0745, 0.0705, 0.0685, 0.066,
	0.0725, 0.071, 0.076, 0.072, 0.068, 0.07, 0.0645, 0.0585, 0.055, 0.0575, 0.056, 0.064, 0.0635, 0.0635, 0.062, 0.066,
	0.0635, 0.0605, 0.0585, 0.0525, 0.05, 0.0465, 0.043, 0.0475, 0.0455, 0.0435, 0.0495, 0.0495, 0.048, 0.054, 0.0495,
	0.056, 0.0565, 0.057, 0.0615, 0.055, 0.048, 0.0515, 0.046, 0.0455, 0.043, 0.041, 0.037, 0.033, 0.036, 0.0375, 0.0375,
	0.035, 0.036, 0.031, 0.0395, 0.042, 0.0375, 0.035, 0.0285, 0.0345, 0.0335, 0.0295, 0.0265, 0.028, 0.029, 0.0335,
	0.027, 0.0245, 0.0275, 0.0295, 0.035, 0.041, 0.0455, 0.046, 0.047, 0.0445, 0.042, 0.044, 0.0445, 0.0405, 0.043,
	0.0355, 0.0375, 0.03, 0.034, 0.036, 0.03, 0.031, 0.037, 0.043, 0.049, 0.042, 0.0375, 0.0335, 0.0345, 0.0285, 0.0235,
	0.0235, 0.0145, 0.0145, 0.016, 0.0155, 0.017, 0.0225, 0.0195, 0.029, 0.024, 0.0265, 0.021, 0.017, 0.0175, 0.017,
	0.0175, 0.023, 0.0215, 0.019, 0.018, 0.0165, 0.018, 0.0225, 0.0205, 0.0215, 0.025, 0.0265, 0.0305, 0.0315, 0.028,
	0.026, 0.023, 0.018, 0.018, 0.0165, 0.014, 0.0165, 0.0135, 0.019, 0.0135, 0.0185, 0.018, 0.0215, 0.017, 0.0145,
	0.0175, 0.015, 0.0205, 0.022, 0.027, 0.0295, 0.0315, 0.0375, 0.0375, 0.035, 0.0375, 0.039, 0.039, 0.04, 0.0385,
	0.0415, 0.0385, 0.0345, 0.0315, 0.035, 0.0415, 0.0375, 0.04, 0.038, 0.039, 0.0435, 0.05, 0.0465, 0.037, 0.0335,
	0.0315, 0.0295, 0.03, 0.023, 0.0205, 0.0215, 0.02, 0.024, 0.019, 0.017, 0.0145, 0.0115, 0.013, 0.0115, 0.013, 0.0155,
	0.0135, 0.0125, 0.0145, 0.0125, 0.0085, 0.0095, 0.0095, 0.0125, 0.009, 0.011, 0.0115, 0.016, 0.015, 0.014, 0.0145,
	0.0145, 0.015, 0.017, 0.017, 0.017, 0.017, 0.0145, 0.0155, 0.0145, 0.0155, 0.018, 0.01, 0.009, 0.012, 0.014, 0.017,
	0.018, 0.0225, 0.0265, 0.0255, 0.0345, 0.0295, 0.0305, 0.025, 0.029, 0.0315, 0.038, 0.0475, 0.0595, 0.066, 0.0645,
	0.0615, 0.0665, 0.0685, 0.0635, 0.064, 0.0645, 0.062, 0.0705, 0.0635, 0.0695, 0.077, 0.064, 0.079, 0.0735, 0.0695,
	0.062, 0.0695, 0.0665, 0.0625, 0.0635, 0.057, 0.06, 0.0585, 0.061, 0.052, 0.046, 0.0425, 0.0395, 0.039, 0.042, 0.044,
	0.0515, 0.0515, 0.0495, 0.049, 0.047, 0.0425, 0.0375, 0.044, 0.046, 0.045, 0.0445, 0.048, 0.052, 0.0545, 0.05, 0.053,
	0.0475, 0.053, 0.0495, 0.052, 0.0525, 0.068, 0.071, 0.067, 0.06, 0.06, 0.0585, 0.0605, 0.067, 0.0675, 0.068, 0.071,
	0.077, 0.0675, 0.0645, 0.069, 0.07, 0.064, 0.071, 0.0815, 0.074, 0.0665, 0.0695, 0.068, 0.061, 0.067, 0.06, 0.056,
	0.07, 0.065, 0.062, 0.0575, 0.056, 0.0505, 0.0625, 0.0645, 0.0575, 0.0635, 0.063, 0.0565, 0.059, 0.0615, 0.0645,
	0.0645, 0.057, 0.054, 0.057, 0.0595, 0.0585, 0.0655, 0.063, 0.057, 0.0545, 0.0525, 0.052, 0.0455, 0.0455, 0.039,
	0.045, 0.0495, 0.057, 0.0635, 0.0735, 0.074, 0.079, 0.081, 0.0765, 0.073, 0.067, 0.062, 0.06, 0.058, 0.061, 0.0685,
	0.0645, 0.069, 0.0745, 0.069, 0.0645, 0.0635, 0.0625, 0.054, 0.05, 0.048, 0.047, 0.038, 0.048, 0.0455, 0.0435, 0.035,
	0.027, 0.0265, 0.0345, 0.0395, 0.0425, 0.042, 0.0455, 0.045, 0.053, 0.0525, 0.0545, 0.0505, 0.05, 0.0435, 0.038,
	0.035, 0.0305, 0.0355, 0.0285, 0.03, 0.032, 0.033, 0.0355, 0.036, 0.0355, 0.03, 0.0285, 0.031, 0.0365, 0.0335, 0.0315,
	0.026, 0.0265, 0.026, 0.026, 0.0215, 0.0225, 0.026, 0.031, 0.0355, 0.029, 0.034, 0.0325, 0.032, 0.0325, 0.037, 0.04,
	0.0415, 0.0365, 0.0415, 0.0385, 0.045, 0.0435, 0.054, 0.06, 0.0465, 0.0535, 0.058, 0.057, 0.0575, 0.0575, 0.0625,
	0.0575, 0.0665, 0.0715, 0.076, 0.078, 0.0875, 0.0765, 0.0695, 0.0745, 0.0675, 0.0645, 0.0685, 0.071, 0.065, 0.06,
	0.0635, 0.0635, 0.0705, 0.0775, 0.0785, 0.0885, 0.0885, 0.0845, 0.0875, 0.0855, 0.0965, 0.0875, 0.08, 0.0685, 0.0735,
	0.074, 0.0755, 0.0745, 0.0735, 0.0705, 0.07, 0.068, 0.066, 0.054, 0.0485, 0.053, 0.0495, 0.049, 0.0425, 0.0385,
	0.0415, 0.0435, 0.036, 0.0385, 0.0455, 0.05, 0.0425, 0.051, 0.052, 0.051, 0.042, 0.046, 0.054, 0.0595, 0.0545, 0.0515,
	0.0465, 0.0515, 0.0495, 0.05, 0.0545, 0.0535, 0.05, 0.0445, 0.0445, 0.0325, 0.036, 0.034, 0.0225, 0.023, 0.0265,
	0.034, 0.0345, 0.0295, 0.0285, 0.0265, 0.0295, 0.022, 0.021, 0.019, 0.0195, 0.018, 0.0165, 0.022, 0.018, 0.0185,
	0.017, 0.018, 0.024, 0.027, 0.03, 0.0295, 0.026, 0.0265, 0.0195, 0.0235, 0.027, 0.0235, 0.0275, 0.0225, 0.0265, 0.027,
	0.0255, 0.031, 0.027, 0.0295, 0.0255, 0.021, 0.0225, 0.019, 0.0165, 0.0125, 0.0135, 0.014, 0.015, 0.013, 0.0145,
	0.0145, 0.0145, 0.017, 0.017, 0.0235, 0.0245, 0.0195, 0.0265, 0.0275, 0.0265, 0.0215, 0.025, 0.0265, 0.024, 0.0325,
	0.0345, 0.0335, 0.033, 0.032, 0.031, 0.036, 0.037, 0.035, 0.0405, 0.0395, 0.046, 0.0535, 0.049, 0.046, 0.0455, 0.0485,
	0.042, 0.042, 0.0305, 0.035, 0.037, 0.037, 0.0375, 0.0415, 0.049, 0.0455, 0.0495, 0.0515, 0.0515, 0.0605, 0.053,
	0.0475, 0.043, 0.0455, 0.048, 0.0485, 0.0575, 0.059, 0.057, 0.05, 0.036, 0.0345, 0.032, 0.034, 0.035, 0.033, 0.023,
	0.022, 0.026, 0.0295, 0.0295, 0.0215, 0.019, 0.0185, 0.017, 0.0185, 0.0165, 0.022, 0.019, 0.0185, 0.0175, 0.02,
	0.0145, 0.018, 0.019, 0.017, 0.0145, 0.0125, 0.0115, 0.015, 0.017, 0.013, 0.017, 0.0185, 0.02, 0.017, 0.0165, 0.0145,
	0.014, 0.0135, 0.013, 0.0135, 0.0145, 0.016, 0.015, 0.0165, 0.0145, 0.0125, 0.0115, 0.0115, 0.01, 0.0095, 0.0125,
	0.0105, 0.01, 0.009, 0.0055, 0.0065, 0.008, 0.007, 0.0075, 0.009, 0.008, 0.012, 0.0115, 0.009, 0.0095, 0.0075, 0.0075,
	0.0085, 0.0085, 0.011, 0.014, 0.01, 0.011, 0.0115, 0.014, 0.0155, 0.0155, 0.012, 0.012, 0.01, 0.013, 0.0145, 0.0125,
	0.0125, 0.0115, 0.011, 0.0075, 0.0075, 0.005, 0.007, 0.009, 0.007, 0.0035, 0.004, 0.003, 0.0015, 0.0005, 0.0005,
	0.0015, 0.0005, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

function createSeries() {
	const N = 5000;
	const ret = [];

	for (let i = 0; i < N; i++) {
		ret.push(Math.random());
	}
	return ret;
}

const options = {
	title: {
		text: 'My chart',
	},
	series: [
		{
			data: createSeries(),
		},
	],
};

const App = () => (
	<div>
		<HighchartsReact highcharts={Highcharts} options={options} />
	</div>
);

export default App;
