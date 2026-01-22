import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const personalInfo = {
    name: '이경윤',
    birthDate: '1990년 07월 18일',
    email: 'gyyi0718@gmail.com',
    title: 'AI/ML Engineer & Medical Imaging Specialist',
    summary: '6년 9개월 경력의 AI/ML 엔지니어. 의료 영상 AI, 컴퓨터 비전, 산업용 검사 시스템 개발 전문가.'
  };

  const careers = [
    {
      id: 1,
      company: 'CJ 4DPLEX',
      role: 'Motion Analysis Engineer',
      period: '2022 - 2025 (3년 4개월)',
      description: '4DX 시네마 시스템을 위한 모션 분석 알고리즘 개발. MCI(Motion Code Intelligence) 프로젝트.',
      tech: ['Python', 'C#', 'OpenCV', 'Signal Processing'],
      achievements: [
        '영상 기반 Roll, Pitch, Heave 모션 데이터 자동 생성 알고리즘 개발',
        '사운드 비트/템포 분석 기반 모션 싱크 시스템 구현',
        '관절 데이터 추출 및 객체 추적 모션 코드 생성'
      ]
    },
    {
      id: 2,
      company: '서울대병원 보라매의료원',
      role: 'AI Research Engineer',
      period: '2021 - 2022 (8개월)',
      description: '의료 영상 AI 모델 개발 - Brain CAD 시스템, CT Metastasis 검출 및 분류 모델 개발.',
      tech: ['PyTorch', 'Medical Imaging', 'Deep Learning', 'ITK', 'VTK'],
      achievements: [
        'Brain MRI nodule detection 시스템 개발',
        'CT Metastasis Segmentation & Classification 모델 개발',
        '작은 병변(0.5mm 미만) 검출에서 수련의와 동등한 성능 달성'
      ]
    },
    {
      id: 3,
      company: '투아이시스',
      role: 'Computer Vision Engineer',
      period: '2020 - 2021 (1년)',
      description: '산업용 비전 검사 시스템 개발 - 전철 T-bar 결함 검출, 팬터그래프 모니터링 시스템.',
      tech: ['YOLOv3/v4', 'Halcon', 'C++', 'MFC', 'TensorRT'],
      achievements: [
        'T-bar 롱이어 결함 검출 모델 (F1-score: 0.99)',
        '팬터그래프 습동면 및 전선 추출 알고리즘 개발',
        '궤도거리표 5종 검출 모델 (precision/recall: 0.95)'
      ]
    },
    {
      id: 4,
      company: '가천대 길병원 의료기기 R&D센터',
      role: 'Medical AI Developer',
      period: '2018 - 2020 (1년 9개월)',
      description: 'Cobbs Angle 자동 측정 시스템, 다양한 의료 영상 Annotation 프로그램 개발.',
      tech: ['PyTorch', 'C++', 'MFC', 'ITK', 'VTK', 'Python', 'Web'],
      achievements: [
        'Cobbs Angle 자동 측정 프로그램 (심평원 프로젝트)',
        '3D/2D Annotation 프로그램 다수 개발',
        '자궁경부암 분류 모델 (AUC: 97.79%)'
      ]
    }
  ];

  // Project Detail Data with charts
  const projectDetails = {
    12: {
      title: '암호화폐 자동매매 시스템',
      subtitle: 'Deep Learning 기반 시계열 예측 트레이딩 봇',
      overview: 'TCN, PatchTST, N-BEATS 등 최신 시계열 예측 아키텍처를 활용하여 암호화폐 가격을 예측하고, 실시간으로 자동 매매를 수행하는 시스템입니다.',
      features: [
        { icon: '📊', title: '다중 모델 앙상블', desc: 'TCN, PatchTST, N-BEATS 모델 앙상블로 예측 정확도 향상' },
        { icon: '🔄', title: '실시간 거래', desc: 'Bybit, Binance, Bithumb 다중 거래소 지원' },
        { icon: '🛡️', title: '리스크 관리', desc: 'Stop-loss, Take-profit, Position sizing 자동화' },
        { icon: '📈', title: '백테스팅', desc: '과거 데이터 기반 전략 검증 시스템' }
      ],
      architecture: [
        { step: 1, title: 'Data Collection', desc: '거래소 API를 통한 실시간 OHLCV 데이터 수집' },
        { step: 2, title: 'Feature Engineering', desc: '기술적 지표 (RSI, MACD, BB 등) 생성' },
        { step: 3, title: 'Model Prediction', desc: 'N-BEATS 모델을 통한 가격 방향 예측' },
        { step: 4, title: 'Signal Generation', desc: '예측 결과 기반 매수/매도 신호 생성' },
        { step: 5, title: 'Order Execution', desc: '거래소 API를 통한 자동 주문 실행' }
      ],
      priceData: [
        { time: '00:00', price: 42150, prediction: 42200, signal: 'hold' },
        { time: '04:00', price: 42380, prediction: 42500, signal: 'buy' },
        { time: '08:00', price: 42890, prediction: 42800, signal: 'hold' },
        { time: '12:00', price: 43250, prediction: 43400, signal: 'hold' },
        { time: '16:00', price: 43680, prediction: 43500, signal: 'sell' },
        { time: '20:00', price: 43420, prediction: 43600, signal: 'buy' },
        { time: '24:00', price: 43850, prediction: 43900, signal: 'hold' }
      ],
      performanceData: [
        { month: 'Jan', return: 12.5, benchmark: 8.2 },
        { month: 'Feb', return: -3.2, benchmark: -5.1 },
        { month: 'Mar', return: 18.7, benchmark: 15.3 },
        { month: 'Apr', return: 8.4, benchmark: 6.1 },
        { month: 'May', return: -1.5, benchmark: -4.8 },
        { month: 'Jun', return: 22.3, benchmark: 18.9 }
      ],
      modelComparison: [
        { model: 'N-BEATS', accuracy: 68, sharpe: 1.82, maxDD: 12 },
        { model: 'TCN', accuracy: 65, sharpe: 1.65, maxDD: 15 },
        { model: 'PatchTST', accuracy: 67, sharpe: 1.78, maxDD: 13 },
        { model: 'Ensemble', accuracy: 72, sharpe: 2.15, maxDD: 9 }
      ],
      metrics: [
        { label: 'Total Return', value: '+156.8%', color: '#43e97b' },
        { label: 'Sharpe Ratio', value: '2.15', color: '#667eea' },
        { label: 'Max Drawdown', value: '-9.2%', color: '#f5576c' },
        { label: 'Win Rate', value: '62.4%', color: '#4facfe' }
      ],
      techStack: ['PyTorch', 'N-BEATS', 'TCN', 'PatchTST', 'Bybit API', 'Binance API', 'PostgreSQL', 'Redis', 'FastAPI']
    },
    1: {
      title: 'Brain CAD System',
      subtitle: 'Computer-Aided Detection for Brain MRI',
      overview: '기간 간격을 두고 촬영한 Brain MRI 영상을 정합하고, nodule을 딥러닝으로 자동 추출하여 분석하는 시스템입니다.',
      features: [
        { icon: '🧠', title: 'MRI 영상 정합', desc: '시간차 촬영 영상의 자동 정합 알고리즘' },
        { icon: '🔍', title: 'Nodule 자동 검출', desc: '딥러닝 기반 병변 자동 탐지' },
        { icon: '📐', title: '단면 변환', desc: 'Sagittal → Axial 자동 변환' },
        { icon: '📊', title: '변화량 분석', desc: '시계열 병변 크기 변화 추적' }
      ],
      architecture: [
        { step: 1, title: 'DICOM Loading', desc: 'MRI DICOM 파일 로드 및 Window Level/Width를 기준으로 DICOM 원본 픽셀값을 0~255 범위로 Linear Normalization 전처리' },
        { step: 2, title: 'Registration', desc: 'ITK 기반 intensity-based 3D rigid registration을 적용, VersorRigid3DTransform + MeanSquares metric + RegularStepGradientDescent optimizer 조합으로 파라미터를 설정한 후 ResampleImageFilter로 raw 영상과 segmentation 마스크를 동일한 좌표계로 정합' },
        { step: 3, title: 'Deep Learning', desc: '3D CNN 기반 nodule detection' },
        { step: 4, title: 'Visualization', desc: 'VTK 기반 Axial 시각화' }
      ],
      detectionData: [
        { size: '0-5mm', detected: 85, total: 100 },
        { size: '5-10mm', detected: 94, total: 100 },
        { size: '10-20mm', detected: 98, total: 100 },
        { size: '>20mm', detected: 100, total: 100 }
      ],
      performanceRadar: [
        { metric: 'Sensitivity', value: 92 },
        { metric: 'Specificity', value: 88 },
        { metric: 'Accuracy', value: 90 },
        { metric: 'F1-Score', value: 89 },
        { metric: 'AUC', value: 94 }
      ],
      metrics: [
        { label: 'Sensitivity', value: '92.3%', color: '#43e97b' },
        { label: 'Specificity', value: '88.5%', color: '#667eea' },
        { label: 'Detection Time', value: '< 30s', color: '#4facfe' },
        { label: 'Dataset Size', value: '1,500+', color: '#f5576c' }
      ],
      techStack: ['C++', 'MFC', 'ITK', 'VTK', 'PyTorch', '3D CNN', 'DICOM']
    },
    2: {
      title: 'Cobbs Angle 자동 측정 시스템',
      subtitle: '심평원 프로젝트 - 척추측만증 진단 자동화',
      overview: 'X-ray 영상에서 딥러닝을 활용하여 척추를 자동 segmentation하고, Cobbs Angle을 자동으로 측정하는 시스템입니다.',
      features: [
        { icon: '🦴', title: '척추 자동 분할', desc: 'U-Net 기반 척추 segmentation' },
        { icon: '📍', title: '랜드마크 검출', desc: 'segmentation된 척추의 외곽선을 추출한 후 End Vertebra 및 Apex 자동 탐지' },
        { icon: '📐', title: '각도 계산', desc: '자동 Cobbs Angle 측정' },
        { icon: '📋', title: '리포트 생성', desc: '측정 결과 자동 문서화' }
      ],
      architecture: [
        { step: 1, title: 'X-ray Input', desc: 'X-ray DICOM 로드 후 DICOM영상 별 파이프라인에 맞게 변환' },
        { step: 2, title: 'Segmentation', desc: '딥러닝 모델로 척추/각 척추체(vertebra) 영역을 마스크로 생성' },
        { step: 3, title: 'Apex Vertebra Detection', desc: '1. 마스크에서 척추 객체 윤곽선 추출 2. 척추 객체의 중심점 계산 그리고 각 척추의 기울기 추정을 위한 회전 바운딩 박스 계산 3. 척추 만곡의 Apex vertebra 자동 선택: 첫 척추 대비 x-편차 최대인 척추 선택 4.Apex 위/아래에서 End vertebra 자동 선택 5.선택된 End vertebra에서 종판(endplate) 방향 선분 좌표 추출' },
        { step: 4, title: 'Angle Calculation', desc: '1. 위/아래 End vertebra의 기울기 각도 계산 2. 각도 방향성(0~360°) 문제 보정 로직 적용 3. Cobbs angle 자동 계산' }
      ],
      angleDistribution: [
        { range: '0-10°', count: 45, severity: 'Normal' },
        { range: '10-25°', count: 32, severity: 'Mild' },
        { range: '25-40°', count: 18, severity: 'Moderate' },
        { range: '>40°', count: 5, severity: 'Severe' }
      ],
      accuracyComparison: [
        { method: 'Manual (Expert)', mae: 0, time: 180 },
        { method: 'Manual (Resident)', mae: 3.2, time: 120 },
        { method: 'Our System', mae: 2.1, time: 5 }
      ],
      metrics: [
        { label: 'MAE', value: '2.1°', color: '#43e97b' },
        { label: 'Processing Time', value: '< 5s', color: '#667eea' },
        { label: 'Correlation', value: '0.97', color: '#4facfe' },
        { label: 'Test Cases', value: '500+', color: '#f5576c' }
      ],
      techStack: ['C++', 'MFC', 'OpenCV', 'ITK', 'VTK', 'PyTorch', 'U-Net']
    },
    3: {
      title: '자궁경부암 Classification 모델',
      subtitle: 'ResNet-50 기반 Cervicography 영상 분류',
      overview: 'NTL헬스케어에서 제공받은 Cervicography 영상을 딥러닝에 적용하여 정상과 비정상을 분류하는 모델입니다.',
      features: [
        { icon: '🔬', title: 'ResNet-50 기반', desc: '사전학습 모델 활용 전이학습' },
        { icon: '📊', title: '5-Fold CV', desc: '교차검증으로 신뢰성 확보' },
        { icon: '⚡', title: '실시간 추론', desc: '빠른 진단 보조 시스템' },
        { icon: '📈', title: '높은 AUC', desc: '97.79% AUC 달성' }
      ],
      architecture: [
        { step: 1, title: 'Data Preprocessing', desc: '영상 정규화 및 증강' },
        { step: 2, title: 'Feature Extraction', desc: 'ResNet-50 특징 추출' },
        { step: 3, title: 'Classification', desc: 'Binary classification' },
        { step: 4, title: 'Ensemble', desc: '5-Fold 앙상블 예측' }
      ],
      foldResults: [
        { fold: 'Fold 1', accuracy: 92.93, auc: 97.37, f1: 94.06 },
        { fold: 'Fold 2', accuracy: 93.22, auc: 97.65, f1: 94.34 },
        { fold: 'Fold 3', accuracy: 93.74, auc: 97.80, f1: 94.80 },
        { fold: 'Fold 4', accuracy: 93.55, auc: 97.77, f1: 94.59 },
        { fold: 'Fold 5', accuracy: 93.60, auc: 98.34, f1: 94.63 }
      ],
      confusionData: [
        { name: 'True Negative', value: 3287 },
        { name: 'True Positive', value: 5029 },
        { name: 'False Positive', value: 320 },
        { name: 'False Negative', value: 256 }
      ],
      metrics: [
        { label: 'Accuracy', value: '93.41%', color: '#43e97b' },
        { label: 'AUC', value: '97.79%', color: '#667eea' },
        { label: 'F1-Score', value: '94.49%', color: '#4facfe' },
        { label: 'Precision', value: '95.60%', color: '#f5576c' }
      ],
      techStack: ['Python', 'TensorFlow', 'Keras', 'ResNet-50', 'Albumentations']
    },
    4: {
      title: 'CT Metastasis 검출 시스템',
      subtitle: '전이암 자동 검출 및 분류',
      overview: 'CT 영상에서 Metastasis를 자동으로 Segmentation하고 유형을 분류하는 딥러닝 모델입니다. 수련의 대비 성능 비교 연구를 수행했습니다.',
      features: [
        { icon: '🫁', title: '병변 검출', desc: '크기별 metastasis 자동 검출' },
        { icon: '🏷️', title: '유형 분류', desc: 'Lytic, Mixed, Sclerotic 분류' },
        { icon: '📊', title: '수련의 비교', desc: '인간 전문가 대비 성능 평가' },
        { icon: '🎯', title: '작은 병변', desc: '0.5mm 미만 병변 검출 가능' }
      ],
      architecture: [
        { step: 1, title: 'CT Loading', desc: 'CT DICOM 시리즈 로드 및 전처리' },
        { step: 2, title: '3D Segmentation', desc: '3D CNN 기반 병변 영역 분할' },
        { step: 3, title: 'Classification', desc: 'Lytic/Mixed/Sclerotic 유형 분류' },
        { step: 4, title: 'Evaluation', desc: '수련의 대비 성능 비교 분석' }
      ],
      sizePerformance: [
        { size: '0-0.5mm', deep: 45.7, human: 43.6 },
        { size: '0.5-1mm', deep: 25.0, human: 45.0 },
        { size: '1-2mm', deep: 38.5, human: 42.3 },
        { size: '>2mm', deep: 36.2, human: 55.3 }
      ],
      typePerformance: [
        { type: 'Lytic', precision: 18.4, recall: 25.8 },
        { type: 'Mixed', precision: 8.5, recall: 61.5 },
        { type: 'Sclerotic', precision: 29.5, recall: 32.7 }
      ],
      metrics: [
        { label: 'Small Lesion Recall', value: '45.7%', color: '#43e97b' },
        { label: 'vs Human (small)', value: '동등', color: '#667eea' },
        { label: 'Sclerotic Accuracy', value: '우수', color: '#4facfe' },
        { label: 'Total Cases', value: '432', color: '#f5576c' }
      ],
      techStack: ['Python', 'PyTorch', '3D CNN', 'Medical Imaging', 'MONAI']
    },
    10: {
      title: 'T-bar 결함 검출 시스템',
      subtitle: '전철 T-Bar 실시간 검사 시스템',
      overview: 'T-Bar 영상에서 롱이어, 애자 등 시설물을 검출하고 결함을 자동으로 탐지하는 시스템입니다.',
      features: [
        { icon: '🔧', title: '4종 객체 검출', desc: 'Insulator, Volt, Hook volt, Defect' },
        { icon: '📸', title: '고해상도 처리', desc: '2048×16384 영상 실시간 분석' },
        { icon: '🚨', title: '자동 알람', desc: '결함 발견 시 지상장치 전송' },
        { icon: '⚡', title: '실시간 처리', desc: 'GPU 가속 실시간 검사' }
      ],
      architecture: [
        { step: 1, title: 'Image Capture', desc: '고해상도 라인스캔 카메라 영상 취득' },
        { step: 2, title: 'Preprocessing', desc: '영상 분할 및 전처리' },
        { step: 3, title: 'Detection', desc: 'YOLOv3 기반 객체 검출' },
        { step: 4, title: 'Alert', desc: '결함 발견 시 알람 전송' }
      ],
      classPerformance: [
        { class: 'Insulator', tp: 478, fp: 2, fn: 2, precision: 99.6, recall: 99.6 },
        { class: 'Volt', tp: 8893, fp: 10, fn: 106, precision: 99.9, recall: 98.8 },
        { class: 'Hook Volt', tp: 20, fp: 1, fn: 0, precision: 95.2, recall: 100 },
        { class: 'Defect', tp: 9, fp: 34, fn: 6, precision: 20.9, recall: 60.0 }
      ],
      overallMetrics: [
        { metric: 'Total TP', value: 9400 },
        { metric: 'Total FP', value: 47 },
        { metric: 'Total FN', value: 114 },
        { metric: 'Accuracy', value: 98.3 }
      ],
      metrics: [
        { label: 'Accuracy', value: '98.3%', color: '#43e97b' },
        { label: 'Precision', value: '99.5%', color: '#667eea' },
        { label: 'Recall', value: '98.8%', color: '#4facfe' },
        { label: 'F1-Score', value: '99.15%', color: '#f5576c' }
      ],
      techStack: ['YOLOv3', 'C++', 'MFC', 'Python', 'CUDA', 'TensorRT']
    },
    9: {
      title: '궤도거리표 검출 시스템',
      subtitle: '열차 선로 안전 관리 시스템',
      overview: '열차 운행 안전 및 선로 보수를 위한 궤도거리표를 자동 검출하고 숫자를 인식하는 시스템입니다.',
      features: [
        { icon: '🚦', title: '5종 클래스', desc: '2, 4, 6, 8, Kilo 표지판 검출' },
        { icon: '🌙', title: '주야간 대응', desc: '다양한 조명 환경 대응' },
        { icon: '⚡', title: '실시간 처리', desc: 'YOLOv4 기반 빠른 검출' },
        { icon: '📍', title: '위치 추적', desc: '거리표 기반 위치 산출' }
      ],
      architecture: [
        { step: 1, title: 'Video Input', desc: '열차 전방 카메라 영상 입력' },
        { step: 2, title: 'Detection', desc: 'YOLOv4 기반 거리표 검출' },
        { step: 3, title: 'Classification', desc: '숫자 클래스 분류 (2,4,6,8,Kilo)' },
        { step: 4, title: 'Tracking', desc: '위치 정보 산출 및 기록' }
      ],
      classResults: [
        { class: '2', ap: 100, tp: 84, fp: 0 },
        { class: '4', ap: 94.65, tp: 89, fp: 9 },
        { class: '6', ap: 86.67, tp: 81, fp: 9 },
        { class: '8', ap: 85.25, tp: 75, fp: 0 },
        { class: 'Kilo', ap: 99.51, tp: 132, fp: 6 }
      ],
      metrics: [
        { label: 'Precision', value: '95%', color: '#43e97b' },
        { label: 'Recall', value: '95%', color: '#667eea' },
        { label: 'F1-Score', value: '95%', color: '#4facfe' },
        { label: 'Avg IoU', value: '74.28%', color: '#f5576c' }
      ],
      techStack: ['YOLOv4', 'C++', 'MFC', 'Darknet', 'CUDA']
    },
    11: {
      title: 'MCI (Motion Code Intelligence)',
      subtitle: '4DX 시네마 자동 모션 코드 생성',
      overview: '영상 내 특징점을 추적하여 6DOF VO 데이터를 추출하고, 4DX 시네마용 모션 코드를 자동 생성하는 시스템입니다.',
      features: [
        { icon: '🎬', title: 'Camera Module', desc: '영상 특징점 기반 Roll, Pitch 생성' },
        { icon: '🎵', title: 'Sound Module', desc: '비트/템포 분석 기반 Heave 생성' },
        { icon: '💃', title: 'Joint Module', desc: '인물 관절 추적 기반 모션 생성' },
        { icon: '📦', title: 'Object Module', desc: '객체 추적 기반 모션 생성' }
      ],
      architecture: [
        { step: 1, title: 'Video Analysis', desc: '영상 프레임 분석 및 특징점 추출' },
        { step: 2, title: 'Audio Analysis', desc: '사운드 비트/템포 분석' },
        { step: 3, title: 'Motion Generation', desc: 'Roll, Pitch, Heave 데이터 생성' },
        { step: 4, title: 'Code Export', desc: '4DX 시스템용 모션 코드 출력' }
      ],
      motionData: [
        { time: 0, roll: 0, pitch: 0, heave: 0 },
        { time: 5, roll: 2.5, pitch: -1.2, heave: 0.8 },
        { time: 10, roll: -1.8, pitch: 2.1, heave: -0.5 },
        { time: 15, roll: 3.2, pitch: -0.8, heave: 1.2 },
        { time: 20, roll: -2.1, pitch: 1.5, heave: -0.3 },
        { time: 25, roll: 1.5, pitch: -2.3, heave: 0.9 },
        { time: 30, roll: -0.8, pitch: 0.5, heave: -0.7 }
      ],
      moduleComparison: [
        { module: 'Camera', similarity: 85 },
        { module: 'Sound', similarity: 78 },
        { module: 'Joint', similarity: 82 },
        { module: 'Object', similarity: 75 }
      ],
      metrics: [
        { label: 'Studio 유사도', value: '85%+', color: '#43e97b' },
        { label: 'Processing', value: 'Real-time', color: '#667eea' },
        { label: 'Modules', value: '4종', color: '#4facfe' },
        { label: 'Axis', value: '3-DOF', color: '#f5576c' }
      ],
      techStack: ['Python', 'C#', 'OpenCV', 'Pose Estimation', 'Signal Processing', 'FFT']
    }
  };

  const projects = [
    {
      id: 1,
      title: 'Brain CAD System',
      category: 'Medical AI',
      description: '기간 간격을 두고 촬영한 Brain MRI 영상을 정합하고, nodule을 딥러닝으로 자동 추출하여 분석하는 시스템.',
      tech: ['C++', 'MFC', 'ITK', 'VTK', 'Deep Learning'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: '🧠',
      hasDetail: true
    },
    {
      id: 2,
      title: 'Cobbs Angle 측정 프로그램',
      category: 'Medical AI',
      description: 'DICOM 영상에서 딥러닝 기술을 적용하여 척추를 자동 segmentation하고 Cobbs angle을 측정하는 심평원 프로젝트.',
      tech: ['C++', 'MFC', 'OpenCV', 'ITK', 'VTK'],
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: '🦴',
      hasDetail: true
    },
    {
      id: 3,
      title: '자궁경부암 분류 모델',
      category: 'Medical AI',
      description: 'NTL헬스케어 Cervicography 영상을 활용한 정상/비정상 분류 딥러닝 모델. AUC 97.79% 달성.',
      tech: ['Python', 'TensorFlow', 'Keras', 'ResNet-50'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '🔬',
      hasDetail: true
    },
    {
      id: 4,
      title: 'CT Metastasis 검출',
      category: 'Medical AI',
      description: 'CT 영상 내 Metastasis를 자동으로 Segmentation하고 Classification. 수련의 대비 성능 비교 연구.',
      tech: ['Python', 'PyTorch', '3D CNN'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '🫁',
      hasDetail: true
    },
    {
      id: 5,
      title: '3D Annotation Program',
      category: 'Annotation Tools',
      description: '코뼈 골절 딥러닝 모델 개발을 위한 CT 데이터 3D Annotation 프로그램.',
      tech: ['C++', 'MFC', 'ITK', 'VTK'],
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      icon: '📦',
      hasDetail: false
    },
    {
      id: 6,
      title: '2D Annotation Program',
      category: 'Annotation Tools',
      description: '부비동 딥러닝 모델 개발을 위한 X-Ray 영상 2D Annotation 프로그램.',
      tech: ['C++', 'MFC', 'ITK', 'VTK'],
      gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
      icon: '🖼️',
      hasDetail: false
    },
    {
      id: 7,
      title: '동영상 Annotation',
      category: 'Annotation Tools',
      description: '대장 내시경 및 수술 동영상 Annotation 프로그램.',
      tech: ['C++', 'MFC', 'OpenCV'],
      gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      icon: '🎬',
      hasDetail: false
    },
    {
      id: 8,
      title: 'Leg Muscle Annotation',
      category: 'Annotation Tools',
      description: 'CT 다리 데이터에서 6개의 근육을 구분하여 Annotation. NifTI 포맷 저장.',
      tech: ['C++', 'MFC', 'ITK', 'VTK', 'OpenCV'],
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      icon: '🦵',
      hasDetail: false
    },
    {
      id: 9,
      title: '궤도거리표 검출',
      category: 'Industrial AI',
      description: '열차 운행 안전을 위한 궤도거리표 자동 검출 및 숫자 인식. F1-score 95%.',
      tech: ['YOLOv4', 'C++', 'MFC'],
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      icon: '🚦',
      hasDetail: true
    },
    {
      id: 10,
      title: 'T-bar 결함 검출',
      category: 'Industrial AI',
      description: '전철 T-Bar 롱이어 결함 자동 탐지. F1-score 99.15%.',
      tech: ['YOLOv3', 'C++', 'MFC', 'Python'],
      gradient: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
      icon: '🔧',
      hasDetail: true
    },
    {
      id: 11,
      title: 'MCI 프로젝트',
      category: 'Motion Analysis',
      description: '4DX 시네마용 자동 모션 코드 생성. Camera, Sound, Joint, Object 4개 모듈.',
      tech: ['Python', 'C#', 'OpenCV', 'Pose Estimation'],
      gradient: 'linear-gradient(135deg, #8360c3 0%, #2ebf91 100%)',
      icon: '🎭',
      hasDetail: true
    },
    {
      id: 12,
      title: '암호화폐 자동매매 시스템',
      category: 'Quant Trading',
      description: 'TCN, PatchTST, N-BEATS 기반 시계열 예측 트레이딩 봇. 다중 거래소 지원.',
      tech: ['PyTorch', 'N-BEATS', 'Bybit API'],
      gradient: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)',
      icon: '📈',
      hasDetail: true
    }
  ];

  const skills = {
    'Deep Learning': ['PyTorch', 'TensorFlow', 'Keras', 'ONNX', 'TensorRT', 'YOLO Series'],
    'Medical Imaging': ['ITK', 'VTK', 'MONAI', 'DICOM', 'NIfTI', '3D Slicer'],
    'Computer Vision': ['OpenCV', 'Halcon', 'Detectron2', 'Albumentations', 'Pose Estimation'],
    'Development': ['C++', 'MFC', 'Python', 'C#', 'FastAPI', 'Git', 'Linux'],
    'NLP/LLM': ['Transformers', 'LangChain', 'LoRA', 'vLLM'],
    'Data & MLOps': ['Pandas', 'NumPy', 'MLflow', 'Docker', 'PostgreSQL']
  };

  const categories = ['all', 'Medical AI', 'Annotation Tools', 'Industrial AI', 'Motion Analysis', 'Quant Trading'];
  const filteredProjects = selectedCategory === 'all' ? projects : projects.filter(p => p.category === selectedCategory);

  const COLORS = ['#667eea', '#43e97b', '#f5576c', '#4facfe', '#fa709a', '#f5af19'];

  // Project Detail Component
  const ProjectDetail = ({ projectId }) => {
    const detail = projectDetails[projectId];
    if (!detail) return null;

    return (
      <div style={{ animation: 'fadeIn 0.5s ease' }}>
        {/* Back Button */}
        <button
          onClick={() => setSelectedProject(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#888',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '32px',
            transition: 'all 0.2s ease'
          }}
        >
          ← 프로젝트 목록으로
        </button>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '700', color: '#fff', margin: '0 0 8px' }}>
            {detail.title}
          </h1>
          <p style={{ fontSize: '18px', color: '#667eea', margin: '0 0 24px' }}>
            {detail.subtitle}
          </p>
          <p style={{ fontSize: '16px', color: '#888', lineHeight: '1.8', maxWidth: '800px' }}>
            {detail.overview}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid-4" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '48px'
        }}>
          {detail.metrics.map((metric, i) => (
            <div key={i} style={{
              padding: '24px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.06)',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '32px', fontWeight: '700', color: metric.color, margin: '0 0 8px' }}>
                {metric.value}
              </p>
              <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
            주요 기능
          </h2>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {detail.features.map((feature, i) => (
              <div key={i} style={{
                padding: '24px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                gap: '16px'
              }}>
                <span style={{ fontSize: '32px' }}>{feature.icon}</span>
                <div>
                  <h3 style={{ fontSize: '16px', color: '#fff', margin: '0 0 4px' }}>{feature.title}</h3>
                  <p style={{ fontSize: '14px', color: '#888', margin: 0 }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section - 암호화폐 자동매매 (ID: 12) */}
        {projectId === 12 && (
          <>
            {/* Price Prediction Chart */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                📊 가격 예측 vs 실제 가격
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={detail.priceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" domain={['dataMin - 500', 'dataMax + 500']} />
                    <Tooltip
                      contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="price" stroke="#667eea" fill="rgba(102,126,234,0.3)" name="실제 가격" />
                    <Area type="monotone" dataKey="prediction" stroke="#43e97b" fill="rgba(67,233,123,0.2)" name="예측 가격" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Returns */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                📈 월별 수익률 비교
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={detail.performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Bar dataKey="return" fill="#667eea" name="전략 수익률 (%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="benchmark" fill="#888" name="벤치마크 (%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Model Comparison */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                🤖 모델 성능 비교
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {detail.modelComparison.map((model, i) => (
                    <div key={i} style={{
                      padding: '20px',
                      background: i === 3 ? 'rgba(102,126,234,0.1)' : 'rgba(255,255,255,0.02)',
                      borderRadius: '12px',
                      border: i === 3 ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.06)',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '16px', color: i === 3 ? '#667eea' : '#fff', margin: '0 0 16px' }}>
                        {model.model}
                        {i === 3 && <span style={{ fontSize: '10px', marginLeft: '8px' }}>⭐</span>}
                      </h4>
                      <div style={{ marginBottom: '12px' }}>
                        <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px' }}>Accuracy</p>
                        <p style={{ fontSize: '20px', color: '#43e97b', margin: 0, fontWeight: '600' }}>{model.accuracy}%</p>
                      </div>
                      <div style={{ marginBottom: '12px' }}>
                        <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px' }}>Sharpe Ratio</p>
                        <p style={{ fontSize: '20px', color: '#4facfe', margin: 0, fontWeight: '600' }}>{model.sharpe}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px' }}>Max DD</p>
                        <p style={{ fontSize: '20px', color: '#f5576c', margin: 0, fontWeight: '600' }}>-{model.maxDD}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Charts Section - Brain CAD (ID: 1) */}
        {projectId === 1 && (
          <>
            {/* Detection Performance by Size */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                📊 병변 크기별 검출 성능
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={detail.detectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="size" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }} />
                    <Legend />
                    <Bar dataKey="detected" fill="#43e97b" name="검출됨" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="total" fill="#333" name="전체" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar Chart */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                🎯 성능 지표
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={detail.performanceRadar}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="metric" stroke="#888" />
                    <PolarRadiusAxis stroke="#666" domain={[0, 100]} />
                    <Radar name="Performance" dataKey="value" stroke="#667eea" fill="#667eea" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Charts Section - Cobbs Angle (ID: 2) */}
        {projectId === 2 && (
          <>
            {/* Angle Distribution */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                📊 Cobbs Angle 분포
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={detail.angleDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="range" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                      formatter={(value, name, props) => [value, `${props.payload.severity}`]}
                    />
                    <Legend />
                    <Bar dataKey="count" name="환자 수" radius={[4, 4, 0, 0]}>
                      {detail.angleDistribution.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index === 0 ? '#43e97b' : index === 1 ? '#4facfe' : index === 2 ? '#f5af19' : '#f5576c'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Accuracy Comparison */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                ⚡ 측정 정확도 및 시간 비교
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  {detail.accuracyComparison.map((item, i) => (
                    <div key={i} style={{
                      padding: '24px',
                      background: i === 2 ? 'rgba(67,233,123,0.1)' : 'rgba(255,255,255,0.02)',
                      borderRadius: '12px',
                      border: i === 2 ? '2px solid #43e97b' : '1px solid rgba(255,255,255,0.06)',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '16px', color: i === 2 ? '#43e97b' : '#fff', margin: '0 0 20px' }}>
                        {item.method}
                        {i === 2 && <span style={{ fontSize: '10px', marginLeft: '8px' }}>⭐</span>}
                      </h4>
                      <div style={{ marginBottom: '16px' }}>
                        <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px' }}>MAE (°)</p>
                        <p style={{ fontSize: '24px', color: '#667eea', margin: 0, fontWeight: '600' }}>{item.mae}°</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '12px', color: '#666', margin: '0 0 4px' }}>처리 시간</p>
                        <p style={{ fontSize: '24px', color: '#4facfe', margin: 0, fontWeight: '600' }}>{item.time}s</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Charts Section - 자궁경부암 (ID: 3) */}
        {projectId === 3 && (
          <>
            {/* 5-Fold Results */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                📊 5-Fold Cross Validation 결과
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={detail.foldResults}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="fold" stroke="#666" />
                    <YAxis stroke="#666" domain={[90, 100]} />
                    <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }} />
                    <Legend />
                    <Line type="monotone" dataKey="accuracy" stroke="#43e97b" strokeWidth={2} name="Accuracy (%)" />
                    <Line type="monotone" dataKey="auc" stroke="#667eea" strokeWidth={2} name="AUC (%)" />
                    <Line type="monotone" dataKey="f1" stroke="#4facfe" strokeWidth={2} name="F1-Score (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Confusion Matrix Style */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                🎯 데이터 분포
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={detail.confusionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {detail.confusionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Charts Section - CT Metastasis (ID: 4) */}
        {projectId === 4 && (
          <>
            {/* Size Performance Comparison */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                📊 병변 크기별 검출 성능 (딥러닝 vs 수련의)
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={detail.sizePerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="size" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }} />
                    <Legend />
                    <Bar dataKey="deep" fill="#667eea" name="딥러닝 (%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="human" fill="#43e97b" name="수련의 (%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Type Performance */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                🏷️ 유형별 분류 성능
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={detail.typePerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis type="number" stroke="#666" domain={[0, 70]} />
                    <YAxis type="category" dataKey="type" stroke="#666" width={80} />
                    <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }} />
                    <Legend />
                    <Bar dataKey="precision" fill="#667eea" name="Precision (%)" />
                    <Bar dataKey="recall" fill="#4facfe" name="Recall (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Charts Section - 궤도거리표 (ID: 9) */}
        {projectId === 9 && (
          <>
            {/* Class Results */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                📊 클래스별 검출 성능
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={detail.classResults}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="class" stroke="#666" />
                    <YAxis stroke="#666" domain={[0, 100]} />
                    <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }} />
                    <Legend />
                    <Bar dataKey="ap" fill="#667eea" name="AP (%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detection Stats */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                🎯 검출 통계
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                  {detail.classResults.map((item, i) => (
                    <div key={i} style={{
                      padding: '20px',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '24px', color: '#667eea', margin: '0 0 12px' }}>{item.class}</h4>
                      <div style={{ marginBottom: '8px' }}>
                        <p style={{ fontSize: '11px', color: '#666', margin: 0 }}>TP</p>
                        <p style={{ fontSize: '18px', color: '#43e97b', margin: 0, fontWeight: '600' }}>{item.tp}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '11px', color: '#666', margin: 0 }}>FP</p>
                        <p style={{ fontSize: '18px', color: '#f5576c', margin: 0, fontWeight: '600' }}>{item.fp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Charts Section - T-bar (ID: 10) */}
        {projectId === 10 && (
          <>
            {/* Class Performance Table */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                📊 클래스별 검출 성능
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={detail.classPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis type="number" stroke="#666" domain={[0, 100]} />
                    <YAxis type="category" dataKey="class" stroke="#666" width={80} />
                    <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }} />
                    <Legend />
                    <Bar dataKey="precision" fill="#667eea" name="Precision (%)" />
                    <Bar dataKey="recall" fill="#43e97b" name="Recall (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detection Stats */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                🎯 검출 통계
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {detail.classPerformance.map((item, i) => (
                    <div key={i} style={{
                      padding: '20px',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '14px', color: '#fff', margin: '0 0 16px' }}>{item.class}</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                        <div>
                          <p style={{ fontSize: '10px', color: '#666', margin: 0 }}>TP</p>
                          <p style={{ fontSize: '16px', color: '#43e97b', margin: 0, fontWeight: '600' }}>{item.tp}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '10px', color: '#666', margin: 0 }}>FP</p>
                          <p style={{ fontSize: '16px', color: '#f5576c', margin: 0, fontWeight: '600' }}>{item.fp}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '10px', color: '#666', margin: 0 }}>FN</p>
                          <p style={{ fontSize: '16px', color: '#f5af19', margin: 0, fontWeight: '600' }}>{item.fn}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Charts Section - MCI (ID: 11) */}
        {projectId === 11 && (
          <>
            {/* Motion Data Chart */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                🎬 모션 코드 데이터 예시
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={detail.motionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="time" stroke="#666" label={{ value: 'Time (s)', position: 'bottom', fill: '#666' }} />
                    <YAxis stroke="#666" />
                    <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }} />
                    <Legend />
                    <Line type="monotone" dataKey="roll" stroke="#667eea" strokeWidth={2} name="Roll (deg)" />
                    <Line type="monotone" dataKey="pitch" stroke="#43e97b" strokeWidth={2} name="Pitch (deg)" />
                    <Line type="monotone" dataKey="heave" stroke="#f5576c" strokeWidth={2} name="Heave (cm)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Module Similarity */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
                📈 모듈별 Studio 유사도
              </h2>
              <div style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={detail.moduleComparison} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis type="number" stroke="#666" domain={[0, 100]} />
                    <YAxis type="category" dataKey="module" stroke="#666" width={80} />
                    <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }} />
                    <Bar dataKey="similarity" fill="#667eea" name="유사도 (%)" radius={[0, 4, 4, 0]}>
                      {detail.moduleComparison.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Architecture */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
            🏗️ 시스템 아키텍처
          </h2>
          <div style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            padding: '8px 0'
          }}>
            {detail.architecture.map((step, i) => (
              <div key={i} style={{
                minWidth: '200px',
                padding: '24px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.06)',
                position: 'relative'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#fff',
                  marginBottom: '16px'
                }}>
                  {step.step}
                </div>
                <h4 style={{ fontSize: '15px', color: '#fff', margin: '0 0 8px' }}>{step.title}</h4>
                <p style={{ fontSize: '13px', color: '#888', margin: 0, lineHeight: '1.5' }}>{step.desc}</p>
                {i < detail.architecture.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    right: '-24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#667eea',
                    fontSize: '20px',
                    zIndex: 1
                  }}>
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 24px' }}>
            🛠️ 기술 스택
          </h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {detail.techStack.map((tech, i) => (
              <span key={i} style={{
                padding: '12px 20px',
                background: 'rgba(102,126,234,0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(102,126,234,0.2)',
                fontSize: '14px',
                color: '#667eea'
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#e0e0e0',
      display: 'flex'
    }}>
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 1000,
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: 'rgba(102,126,234,0.9)',
          border: 'none',
          cursor: 'pointer',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px'
        }}
      >
        <span style={{ width: '20px', height: '2px', background: '#fff', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
        <span style={{ width: '20px', height: '2px', background: '#fff', borderRadius: '2px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
        <span style={{ width: '20px', height: '2px', background: '#fff', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
      </button>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setMenuOpen(false)}
          style={{
            display: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 998
          }}
        />
      )}

      {/* Left Sidebar */}
      <aside 
        className={`sidebar ${menuOpen ? 'open' : ''}`}
        style={{
          width: '300px',
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #12121a 0%, #0d0d14 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          padding: '40px 28px',
          position: 'fixed',
          left: 0,
          top: 0,
          overflowY: 'auto',
          zIndex: 999,
          transition: 'transform 0.3s ease'
        }}
      >
        {/* Profile */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
          }}>
            👨‍💻
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            margin: '0 0 8px',
            background: 'linear-gradient(135deg, #fff 0%, #a0a0a0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {personalInfo.name}
          </h1>
          <p style={{ fontSize: '13px', color: '#888', margin: '0 0 12px' }}>
            {personalInfo.title}
          </p>
          <p style={{ fontSize: '12px', color: '#667eea' }}>
            {personalInfo.email}
          </p>
        </div>

        {/* Navigation */}
        <nav style={{ marginBottom: '40px' }}>
          {['about', 'career', 'projects', 'skills'].map((section) => (
            <button
              key={section}
              onClick={() => { setActiveSection(section); setSelectedProject(null); setMenuOpen(false); }}
              style={{
                width: '100%',
                padding: '12px 18px',
                marginBottom: '6px',
                background: activeSection === section 
                  ? 'linear-gradient(90deg, rgba(102,126,234,0.15) 0%, transparent 100%)'
                  : 'transparent',
                border: 'none',
                borderLeft: activeSection === section ? '3px solid #667eea' : '3px solid transparent',
                borderRadius: '0 8px 8px 0',
                color: activeSection === section ? '#fff' : '#888',
                fontSize: '14px',
                fontWeight: activeSection === section ? '600' : '400',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {section === 'about' && '👤 About Me'}
              {section === 'career' && '💼 경력사항'}
              {section === 'projects' && '🚀 포트폴리오'}
              {section === 'skills' && '⚡ Skills'}
            </button>
          ))}
        </nav>

        {/* Stats */}
        <div style={{
          padding: '20px',
          background: 'rgba(102,126,234,0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(102,126,234,0.1)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', textAlign: 'center' }}>
            <div>
              <p style={{ fontSize: '22px', fontWeight: '700', color: '#667eea', margin: 0 }}>6+</p>
              <p style={{ fontSize: '10px', color: '#666', margin: '4px 0 0' }}>Years</p>
            </div>
            <div>
              <p style={{ fontSize: '22px', fontWeight: '700', color: '#667eea', margin: 0 }}>14+</p>
              <p style={{ fontSize: '10px', color: '#666', margin: '4px 0 0' }}>Projects</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className="main-content"
        style={{
          marginLeft: '300px',
          flex: 1,
          padding: '56px 72px'
        }}
      >
        {/* Show Project Detail if selected */}
        {selectedProject ? (
          <ProjectDetail projectId={selectedProject} />
        ) : (
          <>
            {/* About Section */}
            {activeSection === 'about' && (
              <section style={{ animation: 'fadeIn 0.5s ease' }}>
                <h2 style={{ fontSize: '36px', fontWeight: '700', margin: '0 0 16px', color: '#fff' }}>
                  About Me
                </h2>
                <p style={{ fontSize: '16px', color: '#888', margin: '0 0 40px', maxWidth: '600px', lineHeight: '1.8' }}>
                  안녕하세요, AI/ML 엔지니어 이경윤입니다. 의료 영상 AI, 컴퓨터 비전, 산업용 검사 시스템 분야에서 6년 9개월의 경력을 보유하고 있습니다.
                </p>

                <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
                  {[
                    { icon: '🏥', title: 'Medical AI', desc: 'Brain CAD, CT Metastasis, Cobbs Angle 등' },
                    { icon: '🏭', title: 'Industrial Vision', desc: 'T-bar 결함 검출, 팬터그래프 모니터링' },
                    { icon: '🎬', title: 'Motion Analysis', desc: '4DX 시네마 자동 모션 코드 생성' }
                  ].map((item, i) => (
                    <div key={i} style={{
                      padding: '28px',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}>
                      <span style={{ fontSize: '36px' }}>{item.icon}</span>
                      <h3 style={{ fontSize: '16px', color: '#fff', margin: '16px 0 8px' }}>{item.title}</h3>
                      <p style={{ fontSize: '13px', color: '#888', margin: 0, lineHeight: '1.6' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Career Section */}
            {activeSection === 'career' && (
              <section style={{ animation: 'fadeIn 0.5s ease' }}>
                <h2 style={{ fontSize: '36px', fontWeight: '700', margin: '0 0 40px', color: '#fff' }}>
                  경력사항
                </h2>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '15px',
                    top: '24px',
                    bottom: '24px',
                    width: '2px',
                    background: 'linear-gradient(180deg, #667eea 0%, rgba(102,126,234,0.1) 100%)'
                  }} />
                  
                  {careers.map((career, index) => (
                    <div key={career.id} style={{ display: 'flex', gap: '28px', marginBottom: '32px', position: 'relative' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#667eea',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#fff',
                        boxShadow: '0 0 20px rgba(102,126,234,0.4)'
                      }}>
                        {careers.length - index}
                      </div>
                      
                      <div style={{
                        flex: 1,
                        padding: '24px',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.06)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                          <div>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 4px', color: '#fff' }}>
                              {career.company}
                            </h3>
                            <p style={{ fontSize: '14px', color: '#667eea', margin: 0 }}>{career.role}</p>
                          </div>
                          <span style={{
                            fontSize: '12px',
                            color: '#666',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '6px 12px',
                            borderRadius: '20px'
                          }}>
                            {career.period}
                          </span>
                        </div>
                        <p style={{ fontSize: '14px', color: '#999', margin: '0 0 16px', lineHeight: '1.6' }}>
                          {career.description}
                        </p>
                        {career.achievements && (
                          <ul style={{ margin: '0 0 16px', paddingLeft: '18px' }}>
                            {career.achievements.map((a, i) => (
                              <li key={i} style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{a}</li>
                            ))}
                          </ul>
                        )}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {career.tech.map((t) => (
                            <span key={t} style={{
                              padding: '4px 10px',
                              background: 'rgba(102,126,234,0.15)',
                              borderRadius: '4px',
                              fontSize: '11px',
                              color: '#667eea'
                            }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {activeSection === 'projects' && (
              <section style={{ animation: 'fadeIn 0.5s ease' }}>
                <h2 style={{ fontSize: '36px', fontWeight: '700', margin: '0 0 24px', color: '#fff' }}>
                  포트폴리오
                </h2>
                <p style={{ fontSize: '14px', color: '#888', margin: '0 0 24px' }}>
                  💡 프로젝트 카드를 클릭하면 상세 페이지로 이동합니다
                </p>
                
                {/* Category Filter */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '10px 18px',
                        background: selectedCategory === cat 
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        borderRadius: '25px',
                        color: selectedCategory === cat ? '#fff' : '#888',
                        fontSize: '13px',
                        fontWeight: selectedCategory === cat ? '600' : '400',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {cat === 'all' ? 'All' : cat}
                    </button>
                  ))}
                </div>

                {/* Projects Grid */}
                <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => project.hasDetail && setSelectedProject(project.id)}
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                      style={{
                        padding: '24px',
                        background: hoveredProject === project.id ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                        borderRadius: '16px',
                        border: project.hasDetail ? '1px solid rgba(102,126,234,0.2)' : '1px solid rgba(255,255,255,0.06)',
                        cursor: project.hasDetail ? 'pointer' : 'default',
                        transition: 'all 0.3s ease',
                        transform: hoveredProject === project.id ? 'translateY(-4px)' : 'none',
                        position: 'relative'
                      }}
                    >
                      {project.hasDetail && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          padding: '4px 8px',
                          background: 'rgba(102,126,234,0.2)',
                          borderRadius: '4px',
                          fontSize: '10px',
                          color: '#667eea'
                        }}>
                          상세보기 →
                        </div>
                      )}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          background: project.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                          flexShrink: 0
                        }}>
                          {project.icon}
                        </div>
                        <div>
                          <span style={{ fontSize: '10px', color: '#667eea', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {project.category}
                          </span>
                          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '4px 0 0', color: '#fff' }}>
                            {project.title}
                          </h3>
                        </div>
                      </div>
                      <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6', margin: '0 0 14px' }}>
                        {project.description}
                      </p>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {project.tech.map((t) => (
                          <span key={t} style={{
                            padding: '3px 8px',
                            background: 'rgba(255,255,255,0.06)',
                            borderRadius: '4px',
                            fontSize: '10px',
                            color: '#999'
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <section style={{ animation: 'fadeIn 0.5s ease' }}>
                <h2 style={{ fontSize: '36px', fontWeight: '700', margin: '0 0 40px', color: '#fff' }}>
                  Skills & Technologies
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                      <h3 style={{
                        fontSize: '13px',
                        color: '#667eea',
                        margin: '0 0 14px',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontWeight: '600'
                      }}>
                        {category}
                      </h3>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {items.map((skill) => (
                          <span key={skill} style={{
                            padding: '10px 18px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            fontSize: '13px',
                            color: '#ccc'
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        
        * { box-sizing: border-box; }
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }

        @media (max-width: 1024px) {
          .main-content {
            padding: 40px 40px !important;
          }
          .grid-4 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex !important;
          }
          
          .mobile-overlay {
            display: block !important;
          }
          
          .sidebar {
            transform: translateX(-100%);
            width: 280px !important;
            padding: 80px 24px 40px !important;
          }
          
          .sidebar.open {
            transform: translateX(0);
          }
          
          .main-content {
            margin-left: 0 !important;
            padding: 80px 20px 40px !important;
          }
          
          .main-content h2 {
            font-size: 28px !important;
          }
          
          .main-content h1 {
            font-size: 28px !important;
          }
          
          .grid-2, .grid-3, .grid-4 {
            grid-template-columns: 1fr !important;
          }
          
          .recharts-wrapper {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
