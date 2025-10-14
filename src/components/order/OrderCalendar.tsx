
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { fr } from "date-fns/locale";

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
      <Card className="max-w-2xl mx-auto md-elevation-2 bg-[hsl(var(--md-sys-color-surface-container))] border-[hsl(var(--md-sys-color-outline-variant))] border">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <CalendarIcon className="w-5 h-5 text-[hsl(var(--md-sys-color-primary))] mr-2" />
            <h3 className="md-title-large text-[hsl(var(--md-sys-color-on-surface))]">
              Calendrier des disponibilités
            </h3>
          </div>
          
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              locale={fr}
              disabled={disabledDays}
              className="rounded-xl border-0"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center text-base sm:text-lg font-semibold",
                caption_label: "text-slate-800",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-transparent p-0 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-slate-600 rounded-md w-8 sm:w-10 font-normal text-xs sm:text-sm",
                row: "flex w-full mt-2",
                cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-emerald-50 [&:has([aria-selected].day-outside)]:bg-emerald-50/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                day: "h-8 w-8 sm:h-10 sm:w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors text-xs sm:text-sm",
                day_range_end: "day-range-end",
                day_selected: "bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:bg-gradient-to-r hover:from-emerald-600 hover:to-blue-600 hover:text-white focus:bg-gradient-to-r focus:from-emerald-500 focus:to-blue-500 focus:text-white shadow-lg",
                day_today: "bg-emerald-100 text-emerald-700 font-semibold",
                day_outside: "day-outside text-slate-400 opacity-50 aria-selected:bg-emerald-50 aria-selected:text-slate-400 aria-selected:opacity-30",
                day_disabled: "text-slate-300 opacity-50 cursor-not-allowed",
                day_range_middle: "aria-selected:bg-emerald-50 aria-selected:text-emerald-700",
                day_hidden: "invisible",
              }}
            />
          </div>

          {/* Legend */}
          <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-center space-x-4 sm:space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-100 rounded mr-2"></div>
                <span className="text-gray-600">Aujourd'hui</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded mr-2"></div>
                <span className="text-gray-600">Sélectionné</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded mr-2"></div>
                <span className="text-gray-600">Indisponible</span>
              </div>
            </div>
          </div>

          {/* Selected Date Info */}
          {selectedDate && (
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-[hsl(var(--md-sys-color-primary-container))] rounded-[var(--md-sys-shape-corner-large)]">
              <div className="text-center">
                <h4 className="md-title-medium text-[hsl(var(--md-sys-color-on-primary-container))] mb-2">
                  Date sélectionnée
                </h4>
                <p className="md-body-large text-[hsl(var(--md-sys-color-on-primary-container))]">
                  {selectedDate.toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="md-body-medium text-[hsl(var(--md-sys-color-on-primary-container))] mt-1">
                  {getAvailableSlots(selectedDate)} créneaux disponibles
                </p>
              </div>
            </div>
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
