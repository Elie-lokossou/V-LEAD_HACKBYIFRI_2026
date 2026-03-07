export const KB = {
    stress: [
        "Je comprends tout à fait que tu te sentes stressé en ce moment. C'est une réaction normale quand on tient à ses études. Est-ce que ce stress vient plutôt de la charge de travail ou d'un examen qui approche ? Sache que prendre quelques minutes pour respirer peut déjà t'aider à y voir plus clair 💙",
        "La pression des examens est parfois lourde à porter, et je suis là pour t'écouter. Est-ce que tu as réussi à t'accorder une petite pause aujourd'hui pour décompresser ? Parfois, s'arrêter un instant est le meilleur moyen de repartir plus fort.",
        "C'est courageux de reconnaître son stress. Dis-moi, quelle est la petite chose qui te pèse le plus aujourd'hui ? On peut essayer de découper ça ensemble pour que ce soit moins impressionnant. Tu n'es pas seul face à cette montagne."
    ],
    fatigue: [
        "Je sens que tu es épuisé, et c'est important de s'écouter. Ton cerveau a aussi besoin de repos pour assimiler tout ce que tu apprends. Est-ce que tu arrives à dormir suffisamment ces derniers temps, ou est-ce que tes pensées t'empêchent de te reposer ?",
        "Prendre soin de son énergie est aussi important que de réviser ses cours. Si tu te sens à bout, c'est peut-être le signe que ton corps demande une vraie coupure. Qu'est-ce qui te ferait du bien là tout de suite, loin des écrans et des livres ?",
        "La fatigue peut vraiment miner le moral, je comprends ce que tu ressens. Est-ce que tu as l'impression que c'est une fatigue passagère ou quelque chose qui dure depuis plusieurs jours ? N'oublie pas que ta santé passe avant tout le reste."
    ],
    decouragement: [
        "C'est difficile quand on a l'impression de ne pas avancer malgré ses efforts. Mais regarde tout le chemin que tu as déjà parcouru ! Qu'est-ce qui te semble le plus dur en ce moment ? Parfois, une petite victoire peut suffire à relancer la machine.",
        "Je comprends ton sentiment de découragement, c'est une étape que beaucoup d'étudiants traversent. Est-ce que tu as quelqu'un à qui parler de ce que tu ressens en dehors d'ici ? Je suis là pour t'encourager, car je sais que tu as les capacités pour réussir.",
        "Ne sois pas trop dur avec toi-même. On a tous des jours sans. Dis-moi, qu'est-ce qui t'aiderait à retrouver un petit peu de motivation aujourd'hui ? Même un tout petit pas compte énormément."
    ],
    motivation: [
        "C'est génial que tu cherches à te remotiver ! Rappelle-toi pourquoi tu as choisi ces études au départ, quelle était ta passion au tout début ? Qu'est-ce qui te ferait plaisir de réussir aujourd'hui, même si c'est une toute petite tâche ?",
        "La motivation va et vient, c'est tout à fait humain. Pour t'aider à démarrer, est-ce qu'on ne choisirait pas ensemble un objectif très simple pour les 30 prochaines minutes ? Je suis sûr que tu vas y arriver.",
        "Tu as déjà prouvé ta détermination en arrivant jusqu'ici. Qu'est-ce qui te redonne de l'énergie d'habitude ? Un café, une musique, un appel à un ami ? Prends ce petit moment pour toi, tu l'as mérité."
    ],
    general: [
        "Je suis PeerBuddy, ton ami bienveillant. Je ne suis pas là pour tes cours, mais pour toi, pour ton moral et ton bien-être. Comment s'est passée ta journée ? Je t'écoute avec attention.",
        "C'est normal d'avoir des hauts et des bas dans son parcours étudiant. Je suis là pour t'accompagner dans les moments de doute. Qu'est-ce qui occupe tes pensées en ce moment ?",
        "Je suis ravi de pouvoir discuter avec toi. N'oublie pas que chaque petit effort que tu fais est précieux. Comment te sens-tu dans ton environnement d'études actuellement ?"
    ]
};

export const SUGGESTIONS = [
    "Je me sens stressé avant mes examens",
    "J'ai l'impression de ne pas avancer",
    "Je n'arrive pas à me concentrer en ce moment",
    "Je suis découragé, j'ai raté mon dernier devoir",
    "Comment gérer la pression des révisions ?",
    "J'ai besoin de motivation pour continuer"
];

export function getBotReply(msg) {
    const m = msg.toLowerCase();
    
    if (/stress|anxi|angois|pression|peur|paniqu/.test(m)) {
        return KB.stress[Math.floor(Math.random() * KB.stress.length)];
    }
    if (/fatigue|épuis|vide|ras.le.bol|sommeil|bout/.test(m)) {
        return KB.fatigue[Math.floor(Math.random() * KB.fatigue.length)];
    }
    if (/décourag|abandon|échou|raté|nul|impossible/.test(m)) {
        return KB.decouragement[Math.floor(Math.random() * KB.decouragement.length)];
    }
    if (/motiv|courag|envie|force|avancer|continuer/.test(m)) {
        return KB.motivation[Math.floor(Math.random() * KB.motivation.length)];
    }
    
    return KB.general[Math.floor(Math.random() * KB.general.length)];
}
