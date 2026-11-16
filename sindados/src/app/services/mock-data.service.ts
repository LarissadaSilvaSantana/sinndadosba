import { Injectable } from '@angular/core';

export interface Noticia {
  titulo: string;
  data: string;
  resumo: string;
}

export interface Acordo {
  titulo: string;
  vigencia: string;
  status: 'Vigente' | 'Em negociação';
  resumo: string;
}

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  readonly noticias: Noticia[] = [
    {
      titulo: 'Reforma da categoria exige atenção às novas regras de contratação',
      data: '12/11/2026',
      resumo: 'Diretoria do SINDADOS-BA acompanha atualização de cláusulas sobre jornada e piso salarial em tecnologia.',
    },
    {
      titulo: 'Encontro sindical mobiliza profissionais da área de TI em Salvador',
      data: '05/11/2026',
      resumo: 'Mais de 200 trabalhadores participaram de reunião para discutir condições de trabalho e qualificação.',
    },
    {
      titulo: 'Campanha por vale-refeição e home office segue em agenda do setor',
      data: '28/10/2026',
      resumo: 'A entidade reforça a pauta de benefícios e regras de trabalho remoto em negociações com empresas do setor.',
    },
  ];

  readonly acordos: Acordo[] = [
    {
      titulo: 'CCT SINDADOS-BA / SINEPD 2025-2026',
      vigencia: '2025/2026',
      status: 'Vigente',
      resumo: 'Reajuste salarial de 7,5%, vale-alimentação e ampliação do auxílio transporte para a categoria.',
    },
    {
      titulo: 'ACT Empresa NovaTech',
      vigencia: '2025/2026',
      status: 'Vigente',
      resumo: 'Cláusula sobre jornada flexível, adicional noturno e plano de capacitação tecnológica para profissionais.',
    },
    {
      titulo: 'CCT Sindicatos Regionais - Negociação em curso',
      vigencia: '2026/2027',
      status: 'Em negociação',
      resumo: 'Pauta em discussão inclui reajuste, vale-alimentação, jornada e regras de contratação de estagiários.',
    },
  ];
}
