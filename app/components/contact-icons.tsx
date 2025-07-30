"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Github, Linkedin, Instagram, DiscIcon as Discord, CreditCardIcon as Venmo, Check } from "lucide-react" // Using Disc and CreditCard for Discord and Venmo
import { Skeleton } from "@/components/ui/skeleton"

interface ContactMethod {
  id: string
  name: string
  username: string
  url: string
  icon: React.ReactNode
  color: string
  copyable?: boolean
}

const contactMethods: ContactMethod[] = [
  {
    id: "email",
    name: "Email",
    username: "hello@thientran.io",
    url: "mailto:hello@thientran.io",
    icon: <Mail className="h-6 w-6" />,
    color: "#3B82F6", // Blue
    copyable: true,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    username: "@thienio",
    url: "https://linkedin.com/in/thienio",
    icon: <Linkedin className="h-6 w-6" />,
    color: "#0A66C2", // LinkedIn Blue
  },
  {
    id: "github",
    name: "GitHub",
    username: "@thien-io",
    url: "https://github.com/thien-io",
    icon: <Github className="h-6 w-6" />,
    color: "#24292e", // GitHub Dark
  },
  {
    id: "discord",
    name: "Discord",
    username: "thien.io",
    url: "https://discord.com/users/thien.io",
    icon: <Discord className="h-6 w-6" />, // Lucide Disc icon
    color: "#5865F2", // Discord Blurple
    copyable: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    username: "@thienran.io",
    url: "https://instagram.com/thientran.io",
    icon: <Instagram className="h-6 w-6" />,
    color: "#E4405F", // Instagram Pink
  },
  {
    id: "venmo",
    name: "Venmo",
    username: "@thienio",
    url: "https://venmo.com/thienio",
    icon: <Venmo className="h-6 w-6" />, // Lucide CreditCard icon
    color: "#3D95CE", // Venmo Blue
  },
]

export function ContactIcons() {
  const [isLoading, setIsLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2500)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        staggerDirection: -1,
        duration: 0.8,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.7,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 30,
        duration: 1.2,
      },
    },
  }

  if (isLoading) {
    return (
      <div className="px-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-3">
              <Skeleton className="h-14 w-14 rounded-full" /> {/* Changed to rounded-full */}
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 max-w-4xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center"
      >
        <AnimatePresence>
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.id}
              variants={itemVariants}
              custom={index}
              className="flex flex-col items-center space-y-4 group cursor-pointer"
              whileHover={{
                y: -8, // Slightly less lift
                transition: {
                  type: "spring",
                  stiffness: 250, // Slightly stiffer for quicker response
                  damping: 25,
                  duration: 0.4, // Quicker hover animation
                },
              }}
              whileTap={{
                scale: 0.95, // Slightly less scale on tap
                transition: { duration: 0.1 },
              }}
              onClick={() => {
                if (method.copyable) {
                  copyToClipboard(method.username, method.id)
                } else {
                  window.open(method.url, "_blank")
                }
              }}
            >
              {/* Minimalistic Icon Container */}
              <motion.div
                className="relative w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300" // Changed to rounded-full, smaller size
                style={{
                  backgroundColor: method.color, // Solid color background
                  boxShadow: `0 2px 10px ${method.color}30`, // Simpler, softer shadow
                }}
                whileHover={{
                  backgroundColor: `${method.color}e0`, // Slightly darker on hover
                  boxShadow: `0 4px 15px ${method.color}40`, // More pronounced shadow on hover
                  scale: 1.05, // Subtle scale on hover
                  transition: {
                    type: "spring",
                    stiffness: 250,
                    damping: 25,
                    duration: 0.4,
                  },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
              >
                {/* Icon */}
                <motion.div
                  className="text-white drop-shadow-sm"
                  whileHover={{
                    scale: 1.05, // Subtle icon scale on hover
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      duration: 0.3,
                    },
                  }}
                >
                  {method.icon}
                </motion.div>

                {/* Copy indicator for copyable items */}
                {method.copyable && (
                  <motion.div
                    className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1.5 shadow-lg border-2 border-white"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: copiedId === method.id ? 1 : 0,
                      opacity: copiedId === method.id ? 1 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      duration: 0.5,
                    }}
                  >
                    <Check className="h-3 w-3 text-white" />
                  </motion.div>
                )}
              </motion.div>

              {/* Username */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.2, duration: 0.6 },
                }}
                whileHover={{
                  scale: 1.02, // Subtle scale on username hover
                  transition: { duration: 0.2 },
                }}
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300">
                  {method.username}
                </p>
                <motion.p
                  className="text-xs text-gray-500 dark:text-gray-400 mt-1"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    transition: { duration: 0.2 },
                  }}
                >
                  {method.copyable ? "Tap to copy" : "Tap to open"}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Simple footer */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 25,
        }}
        className="text-center mt-16 mb-8"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">Tap any icon to connect</p>
      </motion.div>
    </div>
  )
}
