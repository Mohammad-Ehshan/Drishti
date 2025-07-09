"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does Project Drishti integrate with existing event management systems?",
    answer:
      "Project Drishti provides RESTful APIs and webhooks that seamlessly integrate with popular event management platforms. Our team provides full technical support during implementation.",
  },
  {
    question: "What types of events can benefit from Project Drishti?",
    answer:
      "Our platform is designed for any large-scale event including concerts, festivals, sports events, conferences, and public gatherings. The AI adapts to different venue types and crowd behaviors.",
  },
  {
    question: "How accurate are the AI predictions?",
    answer:
      "Our machine learning models achieve 94% accuracy in crowd flow predictions and 87% accuracy in incident prediction, based on analysis of over 1000 events worldwide.",
  },
  {
    question: "What data privacy measures are in place?",
    answer:
      "We implement end-to-end encryption, comply with GDPR and CCPA regulations, and provide full data anonymization options. All personal data is processed according to strict privacy protocols.",
  },
  {
    question: "How quickly can the system be deployed for an event?",
    answer:
      "Standard deployment takes 2-3 weeks including setup, training, and testing. For urgent deployments, our rapid response team can have the system operational within 48 hours.",
  },
]

export default function FAQSection() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">Everything you need to know about Project Drishti</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
