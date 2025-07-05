"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertTriangle, Smile, Frown, Meh } from "lucide-react"

const sentimentData = [
  { time: "12:00", positive: 75, neutral: 20, negative: 5, overall: "positive" },
  { time: "12:30", positive: 70, neutral: 25, negative: 5, overall: "positive" },
  { time: "13:00", positive: 65, neutral: 30, negative: 5, overall: "positive" },
  { time: "13:30", positive: 60, neutral: 25, negative: 15, overall: "neutral" },
  { time: "14:00", positive: 45, neutral: 30, negative: 25, overall: "negative" },
  { time: "14:30", positive: 40, neutral: 35, negative: 25, overall: "negative" },
]

const currentSentiment = sentimentData[sentimentData.length - 1]
const previousSentiment = sentimentData[sentimentData.length - 2]

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return <Smile className="h-5 w-5 text-green-500" />
    case "negative":
      return <Frown className="h-5 w-5 text-red-500" />
    default:
      return <Meh className="h-5 w-5 text-yellow-500" />
  }
}

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return "text-green-500 bg-green-500/10"
    case "negative":
      return "text-red-500 bg-red-500/10"
    default:
      return "text-yellow-500 bg-yellow-500/10"
  }
}

export default function SentimentChart() {
  const isRisingPanic = currentSentiment.negative > previousSentiment.negative + 10

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Crowd Sentiment Analysis</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Real-time analysis of crowd emotions using AI-powered facial recognition and behavior analysis
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Sentiment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getSentimentColor(currentSentiment.overall)} mb-2`}
            >
              {getSentimentIcon(currentSentiment.overall)}
            </div>
            <div className="font-medium capitalize">{currentSentiment.overall}</div>
            <div className="text-sm text-muted-foreground">Overall Mood</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{currentSentiment.positive}%</div>
            <div className="text-sm text-muted-foreground">Positive Sentiment</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">{currentSentiment.negative}%</div>
            <div className="text-sm text-muted-foreground">Negative Sentiment</div>
          </div>
        </div>

        {/* Panic Alert */}
        {isRisingPanic && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <div>
                <div className="font-medium text-red-700 dark:text-red-400">Rising Panic Detected</div>
                <div className="text-sm text-red-600 dark:text-red-300">
                  Negative sentiment increased by {currentSentiment.negative - previousSentiment.negative}% in the last
                  30 minutes
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Sentiment Timeline */}
        <div className="space-y-4">
          <h4 className="font-medium">Sentiment Timeline</h4>
          <div className="space-y-3">
            {sentimentData.map((data, index) => (
              <motion.div
                key={data.time}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center space-x-4"
              >
                <div className="w-12 text-sm text-muted-foreground">{data.time}</div>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 bg-secondary rounded-full h-6 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${data.positive}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="absolute left-0 top-0 h-full bg-green-500"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${data.neutral}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                      className="absolute top-0 h-full bg-yellow-500"
                      style={{ left: `${data.positive}%` }}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${data.negative}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.4 }}
                      className="absolute top-0 h-full bg-red-500"
                      style={{ left: `${data.positive + data.neutral}%` }}
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    {getSentimentIcon(data.overall)}
                    {data.negative > previousSentiment?.negative && <TrendingUp className="h-4 w-4 text-red-500" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Positive</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span>Neutral</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>Negative</span>
          </div>
        </div>

        {/* Analysis Insights */}
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">AI Insights</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                Trend
              </Badge>
              <span>Sentiment declining over past hour</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                Trigger
              </Badge>
              <span>Long wait times at food vendors detected</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                Recommendation
              </Badge>
              <span>Deploy additional staff to high-stress areas</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
