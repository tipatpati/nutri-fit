
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar as CalendarIcon, AlertCircle, CheckCircle } from "lucide-react";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";

interface OrderCalendarProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  isDateAvailable: (date: Date) => boolean;
  getAvailableSlots: (date: Date) => number;
  onBack?: () => void;
}

const OrderCalendar = ({ 
  selectedDate, 
  onDateSelect, 
  isDateAvailable, 
  getAvailableSlots,
  onBack
}: OrderCalendarProps) => {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  const disabledDays = (date: Date) => {
    const isPast = date < today;
    const isTooFar = date > maxDate;
    const isUnavailable = !isPast && !isTooFar && !isDateAvailable(date);
    return isPast || isTooFar || isUnavailable;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="md-headline-medium text-[hsl(var(--md-sys-color-on-surface))] mb-2 sm:mb-4">
          Choisissez votre date de livraison
        </h2>
        <p className="md-body-large text-[hsl(var(--md-sys-color-on-surface-variant))]">
          Sélectionnez la date à laquelle vous souhaitez recevoir vos repas
        </p>
      </div>

      {/* Calendar Card */}
      <Card className="glass-strong max-w-2xl mx-auto shadow-2xl border-2 border-[#DE6E27]/20">
        <CardContent className="p-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CalendarIcon className="w-6 h-6 text-[#DE6E27] mr-3" />
            </motion.div>
            <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210]">
              Calendrier des disponibilités
            </h3>
          </motion.div>
          
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              locale={fr}
              disabled={disabledDays}
              className="rounded-2xl border-0 glass p-4 pointer-events-auto"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center text-base sm:text-lg font-semibold",
                caption_label: "text-[#2B3210]",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-transparent p-0 text-[#505631] hover:bg-[#DE6E27]/10 hover:text-[#DE6E27] rounded-lg transition-colors",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-[#505631] rounded-md w-10 font-normal text-sm",
                row: "flex w-full mt-2",
                cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                day: "h-10 w-10 p-0 font-normal hover:bg-[#DE6E27]/10 hover:text-[#DE6E27] rounded-lg transition-colors text-sm",
                day_range_end: "day-range-end",
                day_selected: "bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white hover:shadow-xl shadow-lg",
                day_today: "bg-[#E5E2D9] text-[#2B3210] font-semibold",
                day_outside: "text-[#505631]/30 opacity-50",
                day_disabled: "text-[#505631]/20 opacity-50 cursor-not-allowed",
                day_hidden: "invisible",
              }}
            />
          </div>

          {/* Selected Date Info */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 p-6 glass-strong rounded-2xl border-2 border-[#DE6E27]/30 shadow-xl"
            >
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#DE6E27] to-[#ff8040] rounded-full flex items-center justify-center shadow-xl"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h4 className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210] mb-2">
                  Date sélectionnée
                </h4>
                <p className="text-lg text-[#505631]">
                  {selectedDate.toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-[#DE6E27] font-semibold mt-2">
                  {getAvailableSlots(selectedDate)} créneaux disponibles
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="max-w-2xl mx-auto bg-[hsl(var(--md-sys-color-tertiary-container))] border-[hsl(var(--md-sys-color-outline-variant))] border">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-[hsl(var(--md-sys-color-on-tertiary-container))] mt-0.5 flex-shrink-0" />
            <div className="md-body-medium text-[hsl(var(--md-sys-color-on-tertiary-container))]">
              <p className="md-title-medium mb-1">Informations importantes :</p>
              <ul className="space-y-1">
                <li>• Livraison gratuite à partir de 3000 DA</li>
                <li>• Commande possible jusqu'à 30 jours à l'avance</li>
                <li>• Créneaux limités par jour selon notre capacité de production</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Back Button */}
      {onBack && (
        <div className="flex justify-center pt-4 sm:pt-6">
          <Button
            variant="outlined"
            size="lg"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'objectif
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderCalendar;
