"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT_INTEREST_OPTIONS,
  contactFormSchema,
  type ContactFormValues,
} from "./schema";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInterestOpen, setIsInterestOpen] = useState(false);
  const [activeInterestIndex, setActiveInterestIndex] = useState(0);
  const interestDropdownRef = useRef<HTMLDivElement>(null);
  const interestTriggerRef = useRef<HTMLButtonElement>(null);
  const interestListboxId = useId();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const selectedInterest = useWatch({ control, name: "interest" });
  const selectedInterestOption = CONTACT_INTEREST_OPTIONS.find(
    (option) => option.value === selectedInterest
  );

  useEffect(() => {
    function handleOutsidePointerDown(event: PointerEvent) {
      if (
        interestDropdownRef.current &&
        !interestDropdownRef.current.contains(event.target as Node)
      ) {
        setIsInterestOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, []);

  function openInterestDropdown() {
    const selectedIndex = CONTACT_INTEREST_OPTIONS.findIndex(
      (option) => option.value === selectedInterest
    );
    setActiveInterestIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsInterestOpen(true);
  }

  function selectInterest(value: ContactFormValues["interest"]) {
    setValue("interest", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setIsInterestOpen(false);
    interestTriggerRef.current?.focus();
  }

  function handleInterestTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsInterestOpen(false);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isInterestOpen) {
        selectInterest(CONTACT_INTEREST_OPTIONS[activeInterestIndex].value);
      } else {
        openInterestDropdown();
      }
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;

      if (!isInterestOpen) {
        openInterestDropdown();
        return;
      }

      setActiveInterestIndex(
        (currentIndex) =>
          (currentIndex + direction + CONTACT_INTEREST_OPTIONS.length) %
          CONTACT_INTEREST_OPTIONS.length
      );
    }
  }

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("request_failed");
      }

      toast.success("Recebemos sua solicitação. Retornaremos em breve.");
      reset();
    } catch {
      toast.error("Não foi possível enviar agora. Tente novamente em instantes.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input id="name" autoComplete="name" {...register("name")} />
          {errors.name && (
            <p className="text-destructive text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
          {errors.email && (
            <p className="text-destructive text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone / WhatsApp</Label>
          <Input id="phone" autoComplete="tel" {...register("phone")} />
          {errors.phone && (
            <p className="text-destructive text-xs">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Empresa (opcional)</Label>
          <Input id="company" autoComplete="organization" {...register("company")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label id="interest-label" htmlFor="interest">
          Assunto da Consultoria
        </Label>
        <div ref={interestDropdownRef} className="relative">
          <input
            type="hidden"
            value={selectedInterest ?? ""}
            readOnly
            {...register("interest")}
          />
          <button
            ref={interestTriggerRef}
            id="interest"
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isInterestOpen}
            aria-controls={interestListboxId}
            aria-activedescendant={
              isInterestOpen
                ? `${interestListboxId}-option-${activeInterestIndex}`
                : undefined
            }
            aria-invalid={errors.interest ? "true" : "false"}
            aria-describedby={errors.interest ? "interest-error" : undefined}
            onClick={() =>
              isInterestOpen ? setIsInterestOpen(false) : openInterestDropdown()
            }
            onKeyDown={handleInterestTriggerKeyDown}
            className={`flex h-10 w-full items-center justify-between rounded-lg border bg-[#0B1320] px-3 text-left text-sm shadow-[0_8px_24px_rgba(2,8,23,0.08)] transition-[border-color,box-shadow,background-color] duration-200 outline-none hover:bg-[#101B2A] focus-visible:border-[#C5A880] focus-visible:ring-4 focus-visible:ring-[#C5A880]/15 ${
              errors.interest
                ? "border-destructive/80 focus-visible:border-destructive focus-visible:ring-destructive/20"
                : "border-[#314154]"
            }`}
          >
            <span
              className={`min-w-0 flex-1 truncate ${
                selectedInterestOption ? "text-slate-100" : "text-slate-400"
              }`}
            >
              {selectedInterestOption?.label ?? "Selecione o assunto da consultoria..."}
            </span>
            <ChevronDown
              className={`size-4 shrink-0 text-[#C5A880] transition-transform duration-200 ${
                isInterestOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {isInterestOpen ? (
            <div
              id={interestListboxId}
              role="listbox"
              aria-labelledby="interest-label"
              className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-[#3A4B60] bg-[#0B1320] p-1.5 shadow-[0_18px_45px_rgba(2,8,23,0.32)]"
            >
              {CONTACT_INTEREST_OPTIONS.map((option, index) => {
                const isSelected = option.value === selectedInterest;
                const isActive = index === activeInterestIndex;

                return (
                  <button
                    key={option.value}
                    id={`${interestListboxId}-option-${index}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActiveInterestIndex(index)}
                    onClick={() => selectInterest(option.value)}
                    className={`flex min-h-10 w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 ${
                      isActive
                        ? "bg-[#18263A] text-white"
                        : "text-slate-300 hover:bg-[#142235] hover:text-white"
                    }`}
                  >
                    <span className="leading-snug">{option.label}</span>
                    {isSelected ? (
                      <Check className="size-4 text-[#D4AF37]" aria-hidden="true" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
        {errors.interest && (
          <p id="interest-error" className="text-destructive text-xs">
            {errors.interest.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea id="message" rows={4} {...register("message")} />
        {errors.message && (
          <p className="text-destructive text-xs">{errors.message.message}</p>
        )}
      </div>

      {/* Honeypot — hidden from real users, bots tend to fill every field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Enviando..." : "Enviar solicitação"}
      </Button>
    </form>
  );
}
