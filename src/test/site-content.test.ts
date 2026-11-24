import { describe, expect, it } from "vitest";
import { plans } from "@/lib/plans";
import { getEbookAction } from "@/lib/ebook-action";

const whatsapp = "https://wa.me/message/CO34TPM7J6K6H1";

describe("Oferta atual da Teacher", () => {
  it("oferece somente a turma em grupo", () => {
    expect(plans).toHaveLength(1);
  });

  it("mantém a mensalidade da turma em R$ 280,00", () => {
    expect(plans[0]?.price).toBe("R$ 280,00");
  });

  it("limita cada turma a 6 alunos", () => {
    expect(plans[0]?.maxStudents).toBe(6);
  });

  it("inclui uma aula ao vivo semanal e os suportes da turma", () => {
    expect(plans[0]?.weeklyLiveClasses).toBe(1);
    expect(plans[0]?.hasRecordedClasses).toBe(true);
    expect(plans[0]?.hasSupportPlatform).toBe(true);
    expect(plans[0]?.materialIncluded).toBe(true);
  });
});

describe("Oferta dos e-books", () => {
  it("entrega o arquivo quando o e-book é gratuito", () => {
    const action = getEbookAction({ is_free: true, file_url: "/ebook.pdf", checkout_url: "" }, whatsapp);
    expect(action).toEqual({ href: "/ebook.pdf", label: "Baixar grátis", download: true });
  });

  it("usa o checkout externo quando o e-book é pago", () => {
    const action = getEbookAction({ is_free: false, file_url: "", checkout_url: "https://pay.example/ebook" }, whatsapp);
    expect(action.href).toBe("https://pay.example/ebook");
    expect(action.download).toBe(false);
  });

  it("leva ao WhatsApp quando ainda não existe checkout", () => {
    const action = getEbookAction({ is_free: false, file_url: "", checkout_url: "" }, whatsapp);
    expect(action.href).toBe(whatsapp);
  });
});
