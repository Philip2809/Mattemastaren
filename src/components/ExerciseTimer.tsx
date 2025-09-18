import React, { useState, useEffect } from 'react';
import './ExerciseTimer.css';

interface ExerciseTimerProps {
    bonusTime: number;
    penaltyTime: number;
    onTimeUpdate: (elapsedTime: number, timeStatus: 'bonus' | 'normal' | 'penalty') => void;
    isRunning: boolean;
    onReset?: () => void;
}

type TimeStatus = 'bonus' | 'normal' | 'penalty';

function ExerciseTimer({ 
    bonusTime, 
    penaltyTime, 
    onTimeUpdate, 
    isRunning, 
    onReset 
}: ExerciseTimerProps) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timeStatus, setTimeStatus] = useState<TimeStatus>('bonus');

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime(prevTime => {
                    const newTime = prevTime + 1;
                    
                    let newStatus: TimeStatus;
                    if (newTime <= bonusTime) {
                        newStatus = 'bonus';
                    } else if (newTime <= penaltyTime) {
                        newStatus = 'normal';
                    } else {
                        newStatus = 'penalty';
                    }
                    
                    setTimeStatus(newStatus);
                    onTimeUpdate(newTime, newStatus);
                    
                    return newTime;
                });
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning, bonusTime, penaltyTime, onTimeUpdate]);

    useEffect(() => {
        if (onReset) {
            setElapsedTime(0);
            setTimeStatus('bonus');
        }
    }, [onReset]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimerClass = (): string => {
        const baseClass = 'exercise-timer';
        switch (timeStatus) {
            case 'bonus':
                return `${baseClass} timer-bonus`;
            case 'normal':
                return `${baseClass} timer-normal`;
            case 'penalty':
                return `${baseClass} timer-penalty`;
            default:
                return baseClass;
        }
    };

    const getStatusText = (): string => {
        switch (timeStatus) {
            case 'bonus':
                return `Bonustid: ${bonusTime - elapsedTime}s kvar`;
            case 'normal':
                return `Normal tid: ${penaltyTime - elapsedTime}s kvar`;
            case 'penalty':
                return 'Tidsavdrag aktivt';
            default:
                return '';
        }
    };

    const getStatusIcon = (): string => {
        switch (timeStatus) {
            case 'bonus':
                return '●';
            case 'normal':
                return '●';
            case 'penalty':
                return '●';
            default:
                return '●';
        }
    };

    const getBonusProgress = (): number => {
        if (elapsedTime <= bonusTime) {
            return ((bonusTime - elapsedTime) / bonusTime) * 100;
        }
        return 0;
    };

    const getNormalProgress = (): number => {
        if (elapsedTime > bonusTime && elapsedTime <= penaltyTime) {
            const normalTimeSpan = penaltyTime - bonusTime;
            const timeInNormal = elapsedTime - bonusTime;
            return ((normalTimeSpan - timeInNormal) / normalTimeSpan) * 100;
        }
        return elapsedTime <= bonusTime ? 100 : 0;
    };

    return (
        <div className={getTimerClass()}>
            <div className="timer-header">
                <span className="timer-icon">{getStatusIcon()}</span>
                <span className="timer-display">{formatTime(elapsedTime)}</span>
            </div>
            
            <div className="timer-status">
                <span className="status-text">{getStatusText()}</span>
            </div>

            <div className="timer-progress">
                {timeStatus === 'bonus' && (
                    <div className="progress-bar bonus-bar">
                        <div 
                            className="progress-fill bonus-fill" 
                            style={{ width: `${getBonusProgress()}%` }}
                        ></div>
                        <span className="progress-label">Bonustid</span>
                    </div>
                )}
                
                {timeStatus === 'normal' && (
                    <div className="progress-bar normal-bar">
                        <div 
                            className="progress-fill normal-fill" 
                            style={{ width: `${getNormalProgress()}%` }}
                        ></div>
                        <span className="progress-label">Normal tid</span>
                    </div>
                )}
                
                {timeStatus === 'penalty' && (
                    <div className="progress-bar penalty-bar">
                        <div className="progress-fill penalty-fill pulse"></div>
                        <span className="progress-label">Minuspoäng!</span>
                    </div>
                )}
            </div>

            <div className="timer-milestones">
                <div className="milestone">
                    <div className="milestone-time">{formatTime(bonusTime)}</div>
                    <div className="milestone-label">Bonusgräns</div>
                </div>
                <div className="milestone">
                    <div className="milestone-time">{formatTime(penaltyTime)}</div>
                    <div className="milestone-label">Minusgräns</div>
                </div>
            </div>
        </div>
    );
}

export default ExerciseTimer;
