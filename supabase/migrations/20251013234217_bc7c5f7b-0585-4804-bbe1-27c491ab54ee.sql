-- Deactivate the old duplicate packs (Decouverte, Equilibre, Performance, Premium)
UPDATE subscription_plans
SET active = false, updated_at = now()
WHERE id IN (
  'a695fd94-637c-408c-a17f-b1c8f0567106',  -- Decouverte
  '0192d4f0-c68e-4198-9f86-837018a77104',  -- Equilibre
  '78418166-b198-4cd8-83f5-4cc15ff37957',  -- Performance
  'c08986ba-8475-47e4-99e6-9a11cb324ee4'   -- Premium
);