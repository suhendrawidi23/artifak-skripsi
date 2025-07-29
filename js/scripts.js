/*!
* Start Bootstrap - Stylish Portfolio v6.0.6 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

// FUNGSI MENAMPILKAN WAKTU
function updateDateTime() {
    const now = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString('en-US', options);
    document.getElementById('datetime').textContent = `${time} - ${date}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Data Dummy untuk LULC dan luas tutupan lahan per tahun
const lulcData = {
    "2019": {
        mapUrl: "LULC 2019.png",
        landCover: [20349.37, 58289.04, 3690.01, 36789.22, 51843.30],
        interpretation: "Pada tahun 2019, hutan mangrove masih mendominasi dengan luas 20.349,37 Ha, namun tekanan alih fungsi lahan mulai tampak seiring meningkatnya luas akuakultur dan lahan terbangun."
    },
    "2020": {
        mapUrl: "LULC 2020.png",
        landCover: [19905.99, 59151.35, 4533.36, 35940.52, 51429.72],
        interpretation: "Tahun 2020 menunjukkan tren penurunan luas hutan mangrove menjadi 19.905,99 Ha, sementara akuakultur dan lahan terbangun mengalami peningkatan, menandakan adanya konversi lahan."
    },
    "2021": {
        mapUrl: "LULC 2021.png",
        landCover: [20915.11, 57592.19, 4742.17, 35603.57, 52107.90],
        interpretation: "Pada 2021, terdapat sedikit pemulihan mangrove menjadi 20.915,11 Ha, meskipun laju akuakultur masih tinggi. Badan air juga mengalami sedikit peningkatan dibandingkan tahun sebelumnya."
    },
    "2022": {
        mapUrl: "LULC 2022.png",
        landCover: [23625.02, 54738.04, 3897.51, 37310.43, 51389.94],
        interpretation: "Tahun 2022 menunjukkan pemulihan hutan mangrove secara signifikan hingga 23.625,02 Ha. Namun, area akuakultur masih mendominasi dengan lebih dari 54.000 Ha."
    },
    "2023": {
        mapUrl: "LULC 2023.png",
        landCover: [21755.82, 55776.63, 4031.38, 37275.51, 52121.60],
        interpretation: "Pada 2023, terjadi sedikit penurunan hutan mangrove menjadi 21.755,82 Ha. Sementara itu, akuakultur tetap tinggi, dan hutan non-mangrove serta badan air relatif stabil."
    },
    "2024": {
        mapUrl: "LULC 2024.png",
        landCover: [23116.62, 55918.49, 4851.30, 34860.43, 52214.10],
        interpretation: "Tahun 2024 menunjukkan pemulihan moderat pada hutan mangrove menjadi 23.116,62 Ha. Namun, akuakultur dan lahan terbangun juga meningkat, mengindikasikan persaingan ruang antara pelestarian dan pemanfaatan ekonomi."
    }
};

// Fungsi untuk mengupdate Peta LULC
function updateMap(data) {
    const mapContainer = document.getElementById('lulc-map');
    if (mapContainer) {
        mapContainer.innerHTML = `<img src="${data.mapUrl}" alt="LULC Map" class="img-fluid">`;
    }
}

// Fungsi untuk mengupdate Chart
function updateChart(data) {
    const ctx = document.getElementById('land-cover-chart').getContext('2d');
    
    if (window.landCoverChart) {
        window.landCoverChart.destroy();
    }

    window.landCoverChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Hutan Mangrove', 'Akuakultur', 'Lahan Terbangun', 'Hutan Non-Mangrove', 'Badan Air'],
            datasets: [{
                data: data.landCover,
                backgroundColor: ['#FF6384', '#36A2EB', '#e69f07', '#4BC0C0', '#F7464A'],
                borderColor: ['#FF6384', '#36A2EB', '#e69f07', '#4BC0C0', '#F7464A'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.raw.toFixed(2) + ' ha';
                        }
                    }
                },
                datalabels: {
                    anchor: 'end',
                    align: 'top',   // supaya di atas bar
                    offset: -2,     // supaya lebih mepet
                    formatter: (value) => value.toFixed(2) + ' ha',
                    font: {
                        weight: 'bold',
                        size: 12
                    },
                    color: '#000',
                    display: true
                }
            },
            scales: {
                x: {
                    ticks: {
                        maxRotation: 0,
                        minRotation: 0,
                        color: '#000',
                        font: {
                            weight: 'bold',
                            size: 12
                        },
                        callback: function(value, index, ticks) {
                            return this.getLabelForValue(value).split(' ');
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10000,
                        color: '#000',
                        font: {
                            weight: 'bold',
                            size: 12
                        }
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

// Fungsi untuk mengupdate Interpretasi
function updateInterpretation(data) {
    document.getElementById('interpretation-text').textContent = data.interpretation;
}

// Fungsi utama untuk mengupdate semua konten berdasarkan tahun yang dipilih
function updateContent() {
    const selectedYear = document.getElementById('year-select').value;
    const data = lulcData[selectedYear];

    updateMap(data);
    updateChart(data);
    updateInterpretation(data);
}

// Menambahkan event listener untuk perubahan tahun
document.getElementById('year-select').addEventListener('change', updateContent);

// Inisialisasi dengan tahun pertama (2019)
document.addEventListener('DOMContentLoaded', updateContent);


// DROPDOWN CARBON ESTIMATION
// DATA DUMMY UNTUK ESTIMASI KARBON PER TAHUN
const carbonData = {
    "TC": { // Total Carbon
        mapUrl: "TC 2024.png",
        carbonValues: [10241358.36, 682205.57, 136321.41, 2510997.20, 678783.28],
        interpretation: "Total karbon menunjukkan nilai terbesar pada hutan mangrove yaitu 10.241.358,36 ton. Ini menegaskan pentingnya hutan mangrove sebagai ekosistem penyimpan karbon utama, berkontribusi besar dalam mitigasi perubahan iklim melalui penyerapan dan penyimpanan CO₂."
    },
    "AGC": { // Aboveground Carbon
        mapUrl: "AGC 2024.png",
        carbonValues: [1570774.52, 0.00, 23286.22, 923801.52, 104428.20],
        interpretation: "Karbon di atas permukaan tanah masih didominasi hutan mangrove dengan 1.570.774,52 ton, diikuti hutan non-mangrove. Ini menunjukkan peran vegetasi mangrove dalam menyerap karbon."
    },
    "BGC": { // Belowground Carbon
        mapUrl: "BGC 2024.png",
        carbonValues: [690031.23, 0.00, 0.00, 314789.73, 52214.10],
        interpretation: "Karbon di bawah permukaan tanah (akar) terbesar juga tersimpan di hutan mangrove sebesar 690.031,23 ton, penting untuk menjaga cadangan karbon jangka panjang."
    },
    "SOC": { // Soil Organic Carbon
        mapUrl: "SOC 2024.png",
        carbonValues: [7890396.94, 682205.57, 113035.19, 1077187.41, 522140.98],
        interpretation: "Karbon organik tanah terbesar terdapat di hutan mangrove dengan 7.890.396,94 ton, berfungsi penting menjaga keseimbangan karbon global."
    },
    "DOC": { // Dead Organic Carbon
        mapUrl: "DOC 2024.png",
        carbonValues: [90154.83, 0.00, 0.00, 195218.44, 0.00],
        interpretation: "Karbon organik mati lebih banyak tersimpan di hutan non-mangrove (195.218,44 ton), walau secara total relatif kecil dibanding bentuk karbon lainnya."
    }
};

// Fungsi untuk memperbarui Peta Karbon
function updateCarbonMap(data) {
    document.getElementById('carbon-map').innerHTML = `<img src="${data.mapUrl}" alt="Carbon Map" class="img-fluid">`;
}

// Fungsi untuk memperbarui Grafik Karbon (mengganti menjadi Bar Chart)
function updateCarbonChart(data) {
    const ctx = document.getElementById('carbon-chart').getContext('2d');
    
    if (window.carbonChart) {
        window.carbonChart.destroy();
    }

    window.carbonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Hutan Mangrove', 'Akuakultur', 'Lahan Terbangun', 'Hutan Non-Mangrove', 'Badan Air'],
            datasets: [{
                data: data.carbonValues,
                backgroundColor: ['#FF6384', '#36A2EB', '#e69f07', '#4BC0C0', '#F7464A'],
                borderColor: ['#FF6384', '#36A2EB', '#e69f07', '#4BC0C0', '#F7464A'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.raw.toFixed(2) + ' ton';
                        }
                    }
                },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    offset: -2, // supaya lebih mepet ke bar
                    formatter: function(value) {
                        return value.toFixed(2) + ' ton';
                    },
                    font: {
                        weight: 'bold',
                        size: 12
                    },
                    color: '#000',
                    display: true
                }
            },
            scales: {
                x: {
                    ticks: {
                        maxRotation: 0,
                        minRotation: 0,
                        color: '#000',
                        font: {
                            weight: 'bold',
                            size: 12
                        },
                        callback: function(value, index, ticks) {
                            return this.getLabelForValue(value).split(' ');
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 500000,
                        color: '#000',
                        font: {
                            weight: 'bold',
                            size: 12
                        }
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}







// Fungsi untuk memperbarui Interpretasi Karbon
function updateCarbonInterpretation(data) {
    document.getElementById('carbon-interpretation-text').textContent = data.interpretation;
}

// Fungsi utama untuk memperbarui semua konten berdasarkan komponen karbon yang dipilih
function updateCarbonContent() {
    const selectedComponent = document.getElementById('carbon-select').value;
    const data = carbonData[selectedComponent];

    updateCarbonMap(data);
    updateCarbonChart(data);
    updateCarbonInterpretation(data);
}

// Menambahkan event listener untuk perubahan komponen karbon
document.getElementById('carbon-select').addEventListener('change', updateCarbonContent);

// Inisialisasi dengan komponen pertama (Total Carbon)
document.addEventListener('DOMContentLoaded', updateCarbonContent);

const carbonData2 = {
    "TC": {
        mapUrl: "Estimasi Testing TC 2024.png",
        featureImportUrl: "TC_feature_importance.png",
        interpretation: "NDMI menjadi fitur terpenting dalam estimasi TC karena merepresentasikan kelembapan tanah yang memengaruhi kesuburan (Roba et al., 2025). IRECI berkontribusi signifikan terkait kesehatan vegetasi yang memengaruhi AGC dan BGC (Muhe & Argaw, 2022). CI dan B11 mencerminkan sifat tanah yang berdampak pada ketersediaan unsur hara (Pham et al., 2021).",
        featureInterpretation: "Feature importance TC diperoleh dari model CatBoost Regression dengan R-square adjusted 0,9064 dan RMSE 508,62."
    },
    "AGC": {
        mapUrl: "Estimasi Testing AGC 2024.png",
        featureImportUrl: "AGC_feature_importance.png",
        interpretation: "NDMI dan B11 menjadi fitur utama dalam estimasi AGC karena sensitif terhadap kelembapan daun dan tanah. IRECI serta TRVI juga penting, konsisten dengan studi mangrove di Teluk Benoa (Suardana et al., 2023). Elevasi ikut memengaruhi struktur vegetasi sehingga berdampak pada AGC (Rijal et al., 2023; Sun et al., 2021).",
        featureInterpretation: "Feature importance AGC diperoleh dari model CatBoost Regression dengan R-square adjusted 0,9342 dan RMSE 75,94."
    },
    "BGC": {
        mapUrl: "Estimasi Testing BGC 2024.png",
        featureImportUrl: "BGC_feature_importance.png",
        interpretation: "B11, IRECI, TRVI, NDMI, dan CI mendominasi kontribusi dalam estimasi BGC. CI berhubungan erat dengan kandungan bahan organik tanah, sementara vegetasi sehat tercermin pada IRECI dan TRVI yang meningkatkan sistem perakaran serta simpanan karbon bawah tanah (Zhao et al., 2025).",
        featureInterpretation: "Feature importance BGC diperoleh dari model SVR dengan R-square adjusted 0,9332 dan RMSE 31,45."
    },
    "SOC": {
        mapUrl: "Estimasi Testing SOC 2024.png",
        featureImportUrl: "SOC_feature_importance.png",
        interpretation: "NDMI menjadi fitur dominan dalam estimasi SOC karena menunjukkan pentingnya kelembapan tanah terhadap akumulasi bahan organik (Oukhattar et al., 2025). IRECI, TRVI, dan CI juga signifikan karena menggambarkan keterkaitan kesehatan vegetasi dengan kandungan karbon tanah (Pham et al., 2021).",
        featureInterpretation: "Feature importance SOC diperoleh dari model CatBoost Regression dengan R-square adjusted 0,9064 dan RMSE 383,17."
    },
    "DOC": {
        mapUrl: "Estimasi Testing DOC 2024.png",
        featureImportUrl: "DOC_feature_importance.png",
        interpretation: "MCARI muncul sebagai fitur kunci dalam estimasi DOC karena merefleksikan stres vegetasi yang memicu pelepasan serasah. Nilai MCARI tinggi mengindikasikan rendahnya klorofil akibat penuaan atau defisiensi nutrisi (Nagy et al., 2024; Jaman et al., 2022).",
        featureInterpretation: "Feature importance DOC diperoleh dari model SVR dengan R-square adjusted 0,9353 dan RMSE 9,59."
    }
};

function updateCarbonMap2(data) {
    document.getElementById('carbon-map2').innerHTML = `<img src="${data.mapUrl}" alt="Carbon Map" class="img-fluid">`;
}

function updateFeatureImport2(data) {
    document.getElementById('feature-import').innerHTML = `<img src="${data.featureImportUrl}" alt="Feature Importance" class="img-fluid">`;
}

function updateCarbonInterpretation2(data) {
    document.getElementById('carbon-interpretation-text2').textContent = data.interpretation;
}

function updateFeatureInterpretation(data) {
    document.getElementById('feature-interpretation').textContent = data.featureInterpretation;
}

function updateCarbonContent2() {
    const selectedComponent2 = document.getElementById('carbon-select2').value;
    const data2 = carbonData2[selectedComponent2];
    
    updateCarbonMap2(data2);
    updateFeatureImport2(data2);
    updateCarbonInterpretation2(data2);
    updateFeatureInterpretation(data2);
}

document.getElementById('carbon-select2').addEventListener('change', updateCarbonContent2);
document.addEventListener('DOMContentLoaded', updateCarbonContent2);
