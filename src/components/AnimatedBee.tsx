'use client'

import { useEffect, useState } from 'react'

interface BeeState {
  id: number
  position: { x: number; y: number }
  targetPosition: { x: number; y: number }
  speed: number
}

const BeeComponent = ({ bee }: { bee: BeeState }) => {
  // Calculate rotation angle based on movement direction
  const dx = bee.targetPosition.x - bee.position.x
  const dy = bee.targetPosition.y - bee.position.y
  const angle = Math.atan2(dy, dx) * (180 / Math.PI)
  
  // Only rotate if moving forward (angle between -90 and 90 degrees)
  const normalizedAngle = ((angle + 180) % 360) - 180
  const displayAngle = Math.abs(normalizedAngle) > 90 ? 0 : normalizedAngle

  return (
    <div
      className="absolute transition-all duration-300 ease-linear"
      style={{
        left: `${bee.position.x}%`,
        top: `${bee.position.y}%`,
        transform: `translate(-50%, -50%) rotate(${displayAngle}deg)`,
      }}
    >
      {/* Custom SVG Bee with Animated Wings */}
      <svg
        width="60"
        height="45"
        viewBox="0 0 80 60"
        className="drop-shadow-lg"
        style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' }}
      >
        {/* Left Wing */}
        <ellipse
          cx="25"
          cy="20"
          rx="18"
          ry="12"
          fill="rgba(255, 255, 255, 0.7)"
          stroke="#333"
          strokeWidth="1"
          style={{
            transformOrigin: '25px 20px',
            animation: 'flapLeft 0.2s ease-in-out infinite alternate',
          }}
        />
        
        {/* Right Wing */}
        <ellipse
          cx="55"
          cy="20"
          rx="18"
          ry="12"
          fill="rgba(255, 255, 255, 0.7)"
          stroke="#333"
          strokeWidth="1"
          style={{
            transformOrigin: '55px 20px',
            animation: 'flapRight 0.2s ease-in-out infinite alternate',
          }}
        />

        {/* Body */}
        <ellipse cx="40" cy="30" rx="15" ry="20" fill="#FFD700" stroke="#333" strokeWidth="1.5" />
        
        {/* Black Stripes */}
        <ellipse cx="40" cy="22" rx="14" ry="4" fill="#000" />
        <ellipse cx="40" cy="30" rx="14" ry="4" fill="#000" />
        <ellipse cx="40" cy="38" rx="14" ry="4" fill="#000" />

        {/* Head */}
        <circle cx="40" cy="12" r="8" fill="#FFD700" stroke="#333" strokeWidth="1.5" />
        
        {/* Eyes */}
        <circle cx="37" cy="11" r="2" fill="#000" />
        <circle cx="43" cy="11" r="2" fill="#000" />
        
        {/* Antennae */}
        <path
          d="M 37 8 Q 35 3 33 1"
          stroke="#333"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 43 8 Q 45 3 47 1"
          stroke="#333"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="33" cy="1" r="1.5" fill="#333" />
        <circle cx="47" cy="1" r="1.5" fill="#333" />

        {/* Stinger */}
        <path
          d="M 40 48 L 40 54"
          stroke="#333"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default function AnimatedBee() {
  const [bees, setBees] = useState<BeeState[]>([])

  // Initialize bees
  useEffect(() => {
    const initialBees: BeeState[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      position: {
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
      },
      targetPosition: {
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
      },
      speed: Math.random() * 0.2 + 0.2, // Random speed between 0.2 and 0.4
    }))
    setBees(initialBees)
  }, [])

  // Update target positions periodically
  useEffect(() => {
    const targetInterval = setInterval(() => {
      setBees((prevBees) =>
        prevBees.map((bee) => {
          // Sometimes fly off-screen (30% chance)
          const shouldFlyOffScreen = Math.random() < 0.3
          
          let newTarget
          if (shouldFlyOffScreen) {
            // Fly off one of the edges
            const edge = Math.floor(Math.random() * 4)
            switch (edge) {
              case 0: // top
                newTarget = { x: Math.random() * 100, y: -20 }
                break
              case 1: // right
                newTarget = { x: 120, y: Math.random() * 100 }
                break
              case 2: // bottom
                newTarget = { x: Math.random() * 100, y: 120 }
                break
              case 3: // left
                newTarget = { x: -20, y: Math.random() * 100 }
                break
              default:
                newTarget = { x: Math.random() * 90 + 5, y: Math.random() * 80 + 10 }
            }
          } else {
            // Stay on screen
            newTarget = {
              x: Math.random() * 90 + 5,
              y: Math.random() * 80 + 10,
            }
          }

          return { ...bee, targetPosition: newTarget }
        })
      )
    }, 4000 + Math.random() * 2000) // Random interval between 4-6 seconds

    return () => clearInterval(targetInterval)
  }, [])

  // Move bees towards their targets
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setBees((prevBees) =>
        prevBees.map((bee) => {
          const dx = bee.targetPosition.x - bee.position.x
          const dy = bee.targetPosition.y - bee.position.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 1) {
            return bee
          }

          return {
            ...bee,
            position: {
              x: bee.position.x + (dx / distance) * bee.speed,
              y: bee.position.y + (dy / distance) * bee.speed,
            },
          }
        })
      )
    }, 30)

    return () => clearInterval(moveInterval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
      {bees.map((bee) => (
        <BeeComponent key={bee.id} bee={bee} />
      ))}

      {/* CSS Animations for Wing Flapping */}
      <style jsx>{`
        @keyframes flapLeft {
          0% {
            transform: rotateY(0deg) translateY(0px);
          }
          100% {
            transform: rotateY(-25deg) translateY(-3px);
          }
        }

        @keyframes flapRight {
          0% {
            transform: rotateY(0deg) translateY(0px);
          }
          100% {
            transform: rotateY(25deg) translateY(-3px);
          }
        }
      `}</style>
    </div>
  )
}
