"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: (formData.get("email") as string)?.trim(),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Une erreur est survenue lors de l'envoi du message.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Impossible de contacter le serveur. Veuillez vérifier votre connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-[116px]">
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full bg-muted flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://www.savonsmarino.ca/wp-content/uploads/2026/04/SM_porte-ouvertes_15avril2026-18-scaled.jpg)` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-32 md:pt-0">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl font-light tracking-wide mb-8">
            Une question, une suggestion ou une commande spéciale? Nous sommes là pour vous.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-playfair font-bold text-foreground mb-8">Informations de contact</h2>
              <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
                N'hésitez pas à nous contacter par le moyen qui vous convient le mieux. Notre équipe vous répondra dans les plus brefs délais.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="bg-primary/10 p-4 rounded-xl text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg mb-1">Siège social</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      110, place de l’Église<br />
                      Saint-Casimir, QC G0A 3L0
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-primary/10 p-4 rounded-xl text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg mb-1">Téléphone</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      +1 (418) 930-6777
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-primary/10 p-4 rounded-xl text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg mb-1">Email</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      savonsmarino@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Hint */}
              <div className="mt-16 p-8 bg-muted rounded-2xl border border-border">
                <h4 className="font-bold mb-4">Restons connectés</h4>
                <p className="text-sm text-muted-foreground mb-0">
                  Suivez-nous sur les réseaux sociaux pour ne rien manquer de nos actualités et promotions.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-background border border-border rounded-2xl shadow-xl p-8 md:p-12">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="bg-primary/10 p-6 rounded-full text-primary mb-6 animate-bounce">
                    <CheckCircle2 className="w-16 h-16" />
                  </div>
                  <h3 className="text-3xl font-playfair font-bold mb-4">Merci !</h3>
                  <p className="text-muted-foreground text-lg mb-8 max-w-sm">
                    Votre message a bien été envoyé. Nous vous contacterons très bientôt à l'adresse fournie.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary font-bold hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-playfair font-bold mb-8">Envoyez-nous un message</h3>
                  
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">Nom complet</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name"
                          required 
                          placeholder="Votre nom"
                          className="px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email"
                          required 
                          placeholder="votre@email.com"
                          className="px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">Sujet</label>
                      <select 
                        id="subject"
                        name="subject"
                        className="px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                      >
                        <option>Question générale</option>
                        <option>Commande spéciale / Sur mesure</option>
                        <option>Ateliers / Cours de savon</option>
                        <option>Partenariat / Devenir revendeur</option>
                        <option>Autre</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                      <textarea 
                        id="message" 
                        name="message"
                        required 
                        rows={6}
                        placeholder="Comment pouvons-nous vous aider?"
                        className="px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>Envoi en cours...</>
                      ) : (
                        <>Envoyer le message <Send className="w-4 h-4" /></>
                      )}
                    </button>
                    
                    <p className="text-[10px] text-center text-muted-foreground mt-4 italic">
                      En envoyant ce formulaire, vous acceptez que vos données soient utilisées pour vous recontacter.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
