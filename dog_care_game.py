import pygame
import random
import sys

# Inicializace
pygame.init()
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600
screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("Můj roztomilý pejsek")

# Barvy
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
BROWN = (139, 69, 19)
PINK = (255, 192, 203)

# Status psa
class Dog:
    def __init__(self):
        self.happiness = 100
        self.hunger = 100
        self.energy = 100
        self.x = WINDOW_WIDTH // 2
        self.y = WINDOW_HEIGHT // 2
        self.size = 50
        self.animation_frame = 0
        self.animation_speed = 0.1

    def draw(self, screen):
        # Tělo
        pygame.draw.circle(screen, BROWN, (self.x, self.y), self.size)
        # Uši
        pygame.draw.circle(screen, BROWN, (self.x - 20, self.y - 30), 15)
        pygame.draw.circle(screen, BROWN, (self.x + 20, self.y - 30), 15)
        # Oči
        pygame.draw.circle(screen, BLACK, (self.x - 10, self.y - 10), 5)
        pygame.draw.circle(screen, BLACK, (self.x + 10, self.y - 10), 5)
        # Čenich
        pygame.draw.circle(screen, PINK, (self.x, self.y), 5)

    def update(self):
        # Status se pomalu zhoršuje
        self.happiness = max(0, self.happiness - 0.1)
        self.hunger = max(0, self.hunger - 0.1)
        self.energy = max(0, self.energy - 0.1)

# Herní objekty
dog = Dog()
clock = pygame.time.Clock()

# Hlavní herní smyčka
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.MOUSEBUTTONDOWN:
            # Krmení psa
            if event.button == 1:  # Levé tlačítko myši
                dog.hunger = min(100, dog.hunger + 20)
                dog.happiness = min(100, dog.happiness + 10)
            # Hra se psem
            elif event.button == 3:  # Pravé tlačítko myši
                dog.happiness = min(100, dog.happiness + 20)
                dog.energy = max(0, dog.energy - 10)

    # Aktualizace
    dog.update()

    # Vykreslování
    screen.fill(WHITE)
    dog.draw(screen)

    # Zobrazení statusu
    font = pygame.font.Font(None, 36)
    happiness_text = font.render(f"Štěstí: {int(dog.happiness)}%", True, BLACK)
    hunger_text = font.render(f"Hlad: {int(dog.hunger)}%", True, BLACK)
    energy_text = font.render(f"Energie: {int(dog.energy)}%", True, BLACK)

    screen.blit(happiness_text, (10, 10))
    screen.blit(hunger_text, (10, 50))
    screen.blit(energy_text, (10, 90))

    pygame.display.flip()
    clock.tick(60)

pygame.quit()
sys.exit() 