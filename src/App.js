import React, { useState, useEffect } from "react";
import { Upload, CheckCircle, Activity } from "lucide-react";
import "./App.css";

const ProgressBar = ({
  percentage = 0,
  type = "upload",
  label = "",
  backgroundColor = "#e5e7eb",
  fillColor = "#3b82f6",
  showIcon = true,
  size = "medium",
}) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const roundedPercentage = Math.round(percentage); // 🔧 round to whole number
    if (displayPercentage !== roundedPercentage) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayPercentage(roundedPercentage);
        setTimeout(() => setIsAnimating(false), 300);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [percentage, displayPercentage]);

  const getIcon = () => {
    if (!showIcon) return null;
    switch (type) {
      case "upload":
        return <Upload className="progress-icon" />;
      case "processing":
        return (
          <Activity
            className={`progress-icon ${isAnimating ? "spinning" : ""}`}
          />
        );
      case "task":
        return displayPercentage === 100 ? (
          <CheckCircle className="progress-icon completed" />
        ) : (
          <Activity className="progress-icon" />
        );
      default:
        return <Activity className="progress-icon" />;
    }
  };

  const getStatusText = () => {
    if (displayPercentage === 100) {
      switch (type) {
        case "upload":
          return "Upload Complete";
        case "processing":
          return "Processing Complete";
        case "task":
          return "Task Completed";
        default:
          return "Complete";
      }
    }
    switch (type) {
      case "upload":
        return "Uploading...";
      case "processing":
        return "Processing...";
      case "task":
        return "In Progress...";
      default:
        return "Loading...";
    }
  };

  const sizeClasses = {
    small: "progress-container-small",
    medium: "progress-container-medium",
    large: "progress-container-large",
  };

  return (
    <div className={`progress-wrapper ${sizeClasses[size]}`}>
      <div className="progress-header">
        <div className="progress-info">
          {getIcon()}
          <div className="progress-text">
            <div className="progress-label">{label || getStatusText()}</div>
            <div className="progress-status">{displayPercentage}% complete</div>
          </div>
        </div>
        <div
          className={`progress-percentage ${
            displayPercentage === 100 ? "completed" : ""
          }`}
        >
          {displayPercentage}%
        </div>
      </div>

      <div
        className="progress-bar-container"
        style={{ backgroundColor }}
        role="progressbar"
        aria-valuenow={displayPercentage}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={`${
          label || getStatusText()
        } - ${displayPercentage}% complete`}
      >
        <div
          className={`progress-bar-fill ${
            displayPercentage === 100 ? "completed" : ""
          }`}
          style={{
            width: `${displayPercentage}%`,
            backgroundColor: displayPercentage === 100 ? "#10b981" : fillColor,
          }}
        >
          <div className="progress-bar-shine"></div>
        </div>

        {displayPercentage > 0 && displayPercentage < 100 && (
          <div className="progress-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
          </div>
        )}
      </div>

      {displayPercentage === 100 && (
        <div className="success-message">
          <CheckCircle className="success-icon" />
          <span>Successfully completed!</span>
        </div>
      )}
    </div>
  );
};

const ProgressBarDemo = () => {
  const [uploadProgress, setUploadProgress] = useState(45);
  const [processingProgress, setProcessingProgress] = useState(78);
  const [taskProgress, setTaskProgress] = useState(100);

  const simulateProgress = (setter, max = 100) => {
    setter(0);
    const interval = setInterval(() => {
      setter((prev) => {
        const next = Math.round(prev + Math.random() * 15); // 🔧 round to whole number
        if (next >= max) {
          clearInterval(interval);
          return max;
        }
        return next;
      });
    }, 200);
  };

  return (
    <div className="app-wrapper">
      <h1>Advanced Progress Bar Component</h1>

      <div className="progress-demo">
        <h2>File Upload Progress</h2>
        <ProgressBar
          percentage={uploadProgress}
          type="upload"
          label="Uploading documents.zip"
          size="large"
        />
        <button onClick={() => simulateProgress(setUploadProgress)}>
          Start Upload
        </button>
      </div>

      <div className="progress-demo">
        <h2>Data Processing</h2>
        <ProgressBar
          percentage={processingProgress}
          type="processing"
          label="Processing customer data"
          fillColor="#8b5cf6"
          size="medium"
        />
        <button onClick={() => simulateProgress(setProcessingProgress)}>
          Start Processing
        </button>
      </div>

      <div className="progress-demo">
        <h2>Task Completion</h2>
        <ProgressBar
          percentage={taskProgress}
          type="task"
          label="Completing project setup"
          fillColor="#f59e0b"
          size="small"
        />
        <button onClick={() => simulateProgress(setTaskProgress)}>
          Start Task
        </button>
      </div>
    </div>
  );
};

export default ProgressBarDemo;
